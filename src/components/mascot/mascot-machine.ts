/**
 * Maskot davranış durum makinesi — saf TypeScript, React/DOM bağımlılığı yok (test edilebilir).
 *
 *   idle ──1.4s──▶ offer ──touch──▶ spill ──▶ runAway ──▶ away (8–15 sn) ──▶ returning ──▶ offer
 *                    └─(~22 sn dokunulmazsa)─▶ idle (dinlenme) ─▶ offer
 *
 * `prefers-reduced-motion`: koşma/kaybolma yok; touch → spill → offer (şekerler statik kalır).
 * Zaman dışarıdan `tick(dtMs)` ile ilerletilir (sekme gizliyken tick çağrılmaz => her şey durur).
 */

export type MascotPhase = "idle" | "offer" | "spill" | "runAway" | "away" | "returning";
export type MascotBubbleKey = "offer" | "angry" | "return";
export type MascotEvent = "touch" | "reset";

export interface MascotDurations {
  idleMs: number;
  /** offer fazında dokunulmazsa dinlenmeye dönmeden önceki bekleme */
  offerPatienceMs: number;
  restMs: number;
  spillMs: number;
  runAwayMs: number;
  awayMinMs: number;
  awayMaxMs: number;
  returningMs: number;
  offerBubbleAtMs: number;
  angryBubbleAtMs: number;
  returnBubbleAtMs: number;
}

export const DEFAULT_DURATIONS: MascotDurations = {
  idleMs: 1400,
  offerPatienceMs: 22000,
  restMs: 4000,
  spillMs: 1700,
  runAwayMs: 1900,
  awayMinMs: 8000,
  awayMaxMs: 15000,
  returningMs: 2300,
  offerBubbleAtMs: 500,
  angryBubbleAtMs: 150,
  returnBubbleAtMs: 1500,
};

export interface MascotSnapshot {
  phase: MascotPhase;
  /** bu fazda geçen süre */
  phaseMs: number;
  bubble: { key: MascotBubbleKey; id: number } | null;
  /** her dökülmede artar */
  spillId: number;
  /** geri dönüş bitince (tezgâh temizliği) artar */
  sweepId: number;
  /** tamamlanan koşup-gelme döngüsü sayısı */
  cycle: number;
}

export interface MascotMachineOptions {
  reducedMotion?: boolean;
  rng?: () => number;
  durations?: Partial<MascotDurations>;
  initialPhase?: MascotPhase;
}

type Listener = (s: MascotSnapshot) => void;

export class MascotMachine {
  private phase: MascotPhase;
  private phaseMs = 0;
  private bubble: MascotSnapshot["bubble"] = null;
  private bubbleId = 0;
  private spillId = 0;
  private sweepId = 0;
  private cycle = 0;
  private reduced: boolean;
  private rng: () => number;
  private d: MascotDurations;
  private awayFor = 0;
  private bubbleFired = false;
  private listeners = new Set<Listener>();

  constructor(opts: MascotMachineOptions = {}) {
    this.reduced = !!opts.reducedMotion;
    this.rng = opts.rng ?? Math.random;
    this.d = { ...DEFAULT_DURATIONS, ...opts.durations };
    this.phase = opts.initialPhase ?? "idle";
    if (this.phase === "away") this.awayFor = this.pickAway();
  }

  get snapshot(): MascotSnapshot {
    return {
      phase: this.phase,
      phaseMs: this.phaseMs,
      bubble: this.bubble,
      spillId: this.spillId,
      sweepId: this.sweepId,
      cycle: this.cycle,
    };
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  setReducedMotion(v: boolean) {
    if (v === this.reduced) return;
    this.reduced = v;
    // hareket azaltılınca koşu fazlarında takılı kalma
    if (v && (this.phase === "runAway" || this.phase === "away" || this.phase === "returning")) {
      this.enter("offer");
    }
  }

  /** @returns olay işlendiyse true */
  send(ev: MascotEvent): boolean {
    if (ev === "reset") {
      this.enter("idle");
      return true;
    }
    if (ev === "touch" && (this.phase === "offer" || this.phase === "idle")) {
      this.enter("spill");
      return true;
    }
    return false;
  }

  /** Zamanı ilerlet (ms). Büyük adımlar (test) birden çok geçişi atlayabilir. */
  tick(dtMs: number) {
    let rest = Math.max(0, Math.min(dtMs, 10 * 60 * 1000));
    // sonsuz döngüye karşı üst sınır
    for (let guard = 0; guard < 32; guard++) {
      const limit = this.limit();
      if (limit === Infinity || this.phaseMs + rest < limit) {
        this.phaseMs += rest;
        this.timedEvents();
        break;
      }
      rest -= limit - this.phaseMs;
      this.phaseMs = limit;
      this.timedEvents();
      this.advance();
    }
  }

  /* ───────── iç ───────── */

  private pickAway() {
    return this.d.awayMinMs + this.rng() * (this.d.awayMaxMs - this.d.awayMinMs);
  }

  private limit(): number {
    switch (this.phase) {
      case "idle":
        return this.d.idleMs;
      case "offer":
        return this.d.offerPatienceMs;
      case "spill":
        return this.d.spillMs;
      case "runAway":
        return this.d.runAwayMs;
      case "away":
        return this.awayFor;
      case "returning":
        return this.d.returningMs;
    }
  }

  private timedEvents() {
    if (this.bubbleFired) return;
    const at =
      this.phase === "offer"
        ? this.d.offerBubbleAtMs
        : this.phase === "spill"
          ? this.d.angryBubbleAtMs
          : this.phase === "returning"
            ? this.d.returnBubbleAtMs
            : null;
    if (at === null || this.phaseMs < at) return;
    this.bubbleFired = true;
    const key: MascotBubbleKey = this.phase === "offer" ? "offer" : this.phase === "spill" ? "angry" : "return";
    this.bubble = { key, id: ++this.bubbleId };
    this.emit();
  }

  private advance() {
    switch (this.phase) {
      case "idle":
        return this.enter("offer");
      case "offer":
        return this.enter("idle"); // sabır doldu: kısa dinlenme, sonra tekrar uzatır
      case "spill":
        return this.enter(this.reduced ? "offer" : "runAway");
      case "runAway":
        return this.enter("away");
      case "away":
        return this.enter("returning");
      case "returning":
        this.cycle++;
        this.sweepId++;
        return this.enter("offer");
    }
  }

  private enter(next: MascotPhase) {
    this.phase = next;
    this.phaseMs = 0;
    this.bubbleFired = false;
    if (next === "spill") this.spillId++;
    if (next === "away") this.awayFor = this.pickAway();
    this.emit();
  }

  private emit() {
    const s = this.snapshot;
    this.listeners.forEach((l) => l(s));
  }
}
