import { PASTEL, STAGE } from "./mascot-config";

/**
 * Seyyar standın SVG çizimleri (mantıksal 320×344 sahne). Arka katman karakterin arkasında,
 * ön katman (saçak püskülü, tezgâh üstü, tepsi, tekerlekler) karakterin önünde durur.
 * Renkler DESIGN.md paletinden; koyu temada filtre ile sakinleştirilir.
 */
const RED = "#9B2B22";
const CREAM = "#F4EADB";
const SAFFRON = "#C8952B";
const ALMOND = "#8A5A34";
const WOOD = "#7A4D2B";
const WOOD_DARK = "#5E3A20";
const STRIPES = [RED, CREAM, SAFFRON, CREAM];

function Awning() {
  // 8 şerit: üst kenar dar, alt kenar geniş (hafif perspektif)
  const n = 8;
  const topX0 = 24;
  const topX1 = 296;
  const botX0 = 8;
  const botX1 = 312;
  const yTop = 8;
  const yBot = 72;
  const tw = (topX1 - topX0) / n;
  const bw = (botX1 - botX0) / n;
  const stripes = Array.from({ length: n }, (_, i) => {
    const pts = `${topX0 + i * tw},${yTop} ${topX0 + (i + 1) * tw},${yTop} ${botX0 + (i + 1) * bw},${yBot} ${botX0 + i * bw},${yBot}`;
    return <polygon key={`s${i}`} points={pts} fill={STRIPES[i % 4]} />;
  });
  const scallops = Array.from({ length: n }, (_, i) => {
    const x0 = botX0 + i * bw;
    const x1 = x0 + bw;
    return (
      <path
        key={`v${i}`}
        d={`M${x0} ${yBot - 1} H${x1} V${yBot + 9} A${bw / 2} 12 0 0 1 ${x0} ${yBot + 9} Z`}
        fill={STRIPES[i % 4]}
      />
    );
  });
  return (
    <g>
      {stripes}
      {/* üst sırt ve ince gölge */}
      <rect x={topX0 - 2} y={yTop - 3} width={topX1 - topX0 + 4} height={4} rx={1.5} fill={SAFFRON} />
      <polygon points={`${botX0},${yBot - 6} ${botX1},${yBot - 6} ${botX1},${yBot} ${botX0},${yBot}`} fill="#000" opacity={0.1} />
      {scallops}
      {/* kenar dikişi */}
      <path
        d={Array.from({ length: n }, (_, i) => {
          const x0 = botX0 + i * bw;
          return `M${x0} ${yBot + 9} A${bw / 2} 12 0 0 0 ${x0 + bw} ${yBot + 9}`;
        }).join(" ")}
        fill="none"
        stroke="#3b140f"
        strokeOpacity={0.35}
        strokeWidth={1.4}
      />
    </g>
  );
}

function Candy({ x, y, r = 0, c, s = 1 }: { x: number; y: number; r?: number; c: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <ellipse rx={7.5} ry={4.8} fill={c} />
      <ellipse rx={7.5} ry={4.8} fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={0.7} strokeDasharray="0.8 1.6" />
      <ellipse cx={-2.2} cy={-1.6} rx={2.6} ry={1.2} fill="#fff" opacity={0.35} />
    </g>
  );
}

export function StandBack() {
  return (
    <svg className="gk-mascot__svg" viewBox={`0 0 ${STAGE.w} ${STAGE.h}`} aria-hidden="true" focusable="false">
      {/* zemin gölgesi */}
      <ellipse cx={160} cy={337} rx={142} ry={7} fill="#2A1A12" opacity={0.18} />
      {/* arka direkler */}
      <rect x={22} y={60} width={9} height={190} fill={WOOD} />
      <rect x={289} y={60} width={9} height={190} fill={WOOD} />
      <rect x={24} y={60} width={2.5} height={190} fill="#fff" opacity={0.12} />
      <rect x={291} y={60} width={2.5} height={190} fill="#fff" opacity={0.12} />
      {/* stand içi: karakterin okunması için sıcak, gölgeli arka duvar */}
      <rect x={31} y={70} width={258} height={166} fill="#3A2214" opacity={0.62} />
      <rect x={31} y={70} width={258} height={30} fill="#1c0f08" opacity={0.28} />
      <rect x={31} y={216} width={258} height={20} fill="#1c0f08" opacity={0.18} />
    </svg>
  );
}

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={26} fill="none" stroke={WOOD} strokeWidth={5} />
      <circle cx={cx} cy={cy} r={22} fill="none" stroke={WOOD_DARK} strokeWidth={1.4} />
      {Array.from({ length: 4 }, (_, i) => (
        <line
          key={i}
          x1={cx - 23 * Math.cos((i * Math.PI) / 4)}
          y1={cy - 23 * Math.sin((i * Math.PI) / 4)}
          x2={cx + 23 * Math.cos((i * Math.PI) / 4)}
          y2={cy + 23 * Math.sin((i * Math.PI) / 4)}
          stroke={WOOD}
          strokeWidth={2.6}
        />
      ))}
      <circle cx={cx} cy={cy} r={5.5} fill={WOOD_DARK} />
      <circle cx={cx} cy={cy} r={2} fill={SAFFRON} />
    </g>
  );
}

export function StandFront({ sign }: { sign: string }) {
  return (
    <svg className="gk-mascot__svg gk-mascot__svg--front" viewBox={`0 0 ${STAGE.w} ${STAGE.h}`} aria-hidden="true" focusable="false">
      {/* tezgâh üstü: kilim örtü */}
      <polygon points="12,246 308,246 300,230 20,230" fill={ALMOND} />
      <polygon points="12,246 308,246 308,250 12,250" fill={WOOD_DARK} />
      <polygon points="20,230 300,230 306,236 14,236" fill="#fff" opacity={0.1} />
      {/* örtünün kenarında küçük kilim baklavaları */}
      <g>
        {Array.from({ length: 16 }, (_, i) => (
          <g key={i} transform={`translate(${28 + i * 17.2} 241)`}>
            <polygon points="0,-3.6 4.4,0 0,3.6 -4.4,0" fill={i % 2 ? SAFFRON : CREAM} />
            <polygon points="0,-1.6 2,0 0,1.6 -2,0" fill={RED} />
          </g>
        ))}
      </g>

      {/* kavanoz (sol) */}
      <g>
        <rect x={30} y={207} width={26} height={24} rx={4} fill="#E6EFEA" opacity={0.55} stroke="#fff" strokeOpacity={0.6} />
        <rect x={34} y={201} width={18} height={7} rx={2} fill="#B88E5E" />
        <Candy x={38} y={225} c={PASTEL[0]} r={-20} s={0.85} />
        <Candy x={48} y={226} c={PASTEL[1]} r={15} s={0.85} />
        <Candy x={43} y={218} c={PASTEL[2]} r={5} s={0.85} />
        <Candy x={51} y={215} c={PASTEL[4]} r={-30} s={0.8} />
        <Candy x={36} y={213} c={PASTEL[5]} r={25} s={0.8} />
      </g>

      {/* tepsi (sağ) */}
      <g>
        <ellipse cx={246} cy={231} rx={42} ry={8} fill={WOOD_DARK} />
        <ellipse cx={246} cy={229} rx={40} ry={7} fill={ALMOND} />
        <ellipse cx={246} cy={228} rx={34} ry={5} fill="#6B4224" />
        <Candy x={226} y={224} c={PASTEL[0]} r={-15} />
        <Candy x={240} y={226} c={PASTEL[1]} r={10} />
        <Candy x={256} y={225} c={PASTEL[2]} r={-8} />
        <Candy x={268} y={227} c={PASTEL[3]} r={20} s={0.95} />
        <Candy x={233} y={217} c={PASTEL[4]} r={25} />
        <Candy x={249} y={218} c={PASTEL[5]} r={-25} />
        <Candy x={263} y={217} c={PASTEL[0]} r={8} s={0.95} />
        <Candy x={241} y={210} c={PASTEL[2]} r={-10} s={0.95} />
        <Candy x={255} y={209} c={PASTEL[1]} r={18} s={0.9} />
      </g>

      {/* saçak püskülü (karakterin önünde) */}
      <Awning />

      {/* asılı küçük tabela */}
      <g className="gk-mascot__hang">
        <line x1={44} y1={90} x2={52} y2={110} stroke="#C7A770" strokeWidth={1.2} />
        <line x1={84} y1={90} x2={76} y2={110} stroke="#C7A770" strokeWidth={1.2} />
        <rect x={34} y={108} width={60} height={22} rx={2.5} fill={CREAM} stroke={RED} strokeWidth={2} />
        <rect x={37.5} y={111.5} width={53} height={15} rx={1} fill="none" stroke={SAFFRON} strokeWidth={0.8} />
        <text
          x={64}
          y={122}
          textAnchor="middle"
          fontSize={sign.length > 12 ? 6.2 : 7.2}
          fill={RED}
          style={{ fontFamily: "var(--font-gloock), Georgia, serif", letterSpacing: "0.2px" }}
        >
          {sign}
        </text>
      </g>

      {/* tekerlekler */}
      <Wheel cx={50} cy={316} />
      <Wheel cx={270} cy={316} />
    </svg>
  );
}
