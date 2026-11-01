import type { Locale } from "@/lib/i18n";

/**
 * "Hangi Badem Şekerisin?" eğlence testi içeriği.
 * Sonuç tipleri kişilik eşlemesidir; gerçek çeşit, üretici veya tarihî iddia DEĞİLDİR.
 */

type L<T> = { tr: T; en: T };

export const quizTypeIds = ["klasik", "pastel", "citir", "cayli"] as const;
export type QuizTypeId = (typeof quizTypeIds)[number];

export const isQuizTypeId = (value: unknown): value is QuizTypeId =>
  typeof value === "string" && (quizTypeIds as readonly string[]).includes(value);

export type QuizOption = {
  text: L<string>;
  /** Şıkkın tiplere verdiği puan. */
  weights: Partial<Record<QuizTypeId, number>>;
};

export type QuizQuestion = {
  prompt: L<string>;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    prompt: {
      tr: "Kapı çaldı. Misafir içeri girmeden eline ne tutuşturursun?",
      en: "The door opens. What do you put in a guest's hand before they even sit down?",
    },
    options: [
      {
        text: {
          tr: "İnce kabuklu beyaz badem şekeri. Tam ortaya, düzgünce.",
          en: "A white almond candy with a thin shell. Dead centre, neatly.",
        },
        weights: { klasik: 2, cayli: 1 },
      },
      {
        text: {
          tr: "Önce çay bardağı. Şeker onun yanına gelir.",
          en: "The tea glass first. The candy comes beside it.",
        },
        weights: { cayli: 2, klasik: 1 },
      },
      {
        text: {
          tr: "Rengi rengine bir avuç. Herkese bir tane, kimse açıkta kalmasın.",
          en: "A handful of every colour. One each, nobody left out.",
        },
        weights: { pastel: 2, citir: 1 },
      },
      {
        text: {
          tr: "En çıtır olanı. “Durma, tadına bak” derim.",
          en: "The crispest one. “Don't wait, taste it.”",
        },
        weights: { citir: 2, pastel: 1 },
      },
    ],
  },
  {
    prompt: {
      tr: "Tepside dört şeker duruyor. Elin hangisine gider?",
      en: "Four candies on the tray. Which one does your hand reach for?",
    },
    options: [
      {
        text: {
          tr: "Bildiğin beyaza. İnce zar, ortadaki, hiç yamuk değil.",
          en: "The familiar white one. A thin shell, in the middle, not a bit crooked.",
        },
        weights: { klasik: 2, cayli: 1 },
      },
      {
        text: {
          tr: "Çay bardağına en yakın durana. İkisi birlikte gider.",
          en: "The one closest to the tea glass. The two belong together.",
        },
        weights: { cayli: 2, klasik: 1 },
      },
      {
        text: {
          tr: "En renkli olana. Sofranın neşesi o.",
          en: "The most colourful one. That's the joy of the table.",
        },
        weights: { pastel: 2, citir: 1 },
      },
      {
        text: {
          tr: "Yeni çekilmiş, hâlâ çıtırdayana.",
          en: "The one pulled just now, still crackling.",
        },
        weights: { citir: 2, pastel: 1 },
      },
    ],
  },
  {
    prompt: {
      tr: "Bir kutu hediye edeceksin. Kutuyu nasıl hazırlarsın?",
      en: "You're giving a box as a gift. How do you prepare it?",
    },
    options: [
      {
        text: {
          tr: "Beyazlar alta, dizilim düzgün, kapak tam oturur.",
          en: "Whites on the bottom, a straight row, the lid sits flush.",
        },
        weights: { klasik: 2, cayli: 1 },
      },
      {
        text: {
          tr: "İçine kısa bir not: “Çayın yanında aç.”",
          en: "A short note inside: “Open it beside the tea.”",
        },
        weights: { cayli: 2, klasik: 1 },
      },
      {
        text: {
          tr: "Her renkten koyarım. Açanın yüzü gülsün.",
          en: "A bit of every colour, so the person who opens it smiles.",
        },
        weights: { pastel: 2, citir: 1 },
      },
      {
        text: {
          tr: "En taze paketi seçerim. “Yolda aç, bekletme.”",
          en: "I pick the freshest pack. “Open it on the way, don't wait.”",
        },
        weights: { citir: 2, pastel: 1 },
      },
    ],
  },
  {
    prompt: {
      tr: "Sofrada kutu açıldı. Şekeri nasıl paylaşırsın?",
      en: "The box is open on the table. How do you share the candy?",
    },
    options: [
      {
        text: {
          tr: "Üçer üçer, herkese eşit. Kimse eksik kalmaz.",
          en: "Three each, the same for everyone. Nobody comes up short.",
        },
        weights: { klasik: 2, cayli: 1 },
      },
      {
        text: {
          tr: "Önce bir yudum çay, sonra bir şeker, sonra kaldığımız yer.",
          en: "A sip of tea, then a candy, then we pick up the story.",
        },
        weights: { cayli: 2, klasik: 1 },
      },
      {
        text: {
          tr: "Avuç avuç. “Alın, alın” diye kutuyu elden ele geçiririm.",
          en: "By the handful. “Take some, take some,” and the box goes round.",
        },
        weights: { pastel: 2, citir: 1 },
      },
      {
        text: {
          tr: "Ortaya iterim. Kim önce uzanırsa o kazanır.",
          en: "I push it to the middle. Whoever reaches first wins.",
        },
        weights: { citir: 2, pastel: 1 },
      },
    ],
  },
  {
    prompt: {
      tr: "Elazığ’dan dönerken çantanda tek göz kaldı. Neyi koyarsın?",
      en: "One pocket left in the bag on the way home from Elazığ. What goes in it?",
    },
    options: [
      {
        text: {
          tr: "Klasik beyazı. Eve girince tepsinin ortasına o konur.",
          en: "The classic white. At home it goes in the middle of the tray.",
        },
        weights: { klasik: 2, cayli: 1 },
      },
      {
        text: {
          tr: "Çayın yanına yetecek kadar. Akşam sohbeti onsuz olmaz.",
          en: "Just enough for beside the tea. The evening talk needs it.",
        },
        weights: { cayli: 2, klasik: 1 },
      },
      {
        text: {
          tr: "Her renkten bir tutam. Kapıya gelenle paylaşmak için.",
          en: "A pinch of every colour, to share with whoever comes to the door.",
        },
        weights: { pastel: 2, citir: 1 },
      },
      {
        text: {
          tr: "En taze, en çıtır paketi. Yolda biterse de olsun.",
          en: "The freshest, crispest pack. If it's gone before you arrive, so be it.",
        },
        weights: { citir: 2, pastel: 1 },
      },
    ],
  },
];

export type QuizResultText = {
  name: string;
  tagline: string;
  description: string;
  /** "Şekerden payına düşen" küçük, esprili alt yazı. */
  share: string;
};

export const quizResults: Record<QuizTypeId, L<QuizResultText>> = {
  klasik: {
    tr: {
      name: "Klasik Beyaz",
      tagline: "Sofranın baş köşesi",
      description:
        "Sakinsin, güvenilirsin, sözün sözdür. Sen odaya girince tabaklar kendiliğinden düzelir, kimse sebebini sormaz. Modası geçmeyen tek şey varsa o da sensin.",
      share: "Payına düşen: üç tane, hepsi tam ortada, hiçbiri yamuk değil.",
    },
    en: {
      name: "Classic White",
      tagline: "The head of the table",
      description:
        "You are calm, dependable and true to your word. When you walk into a room, the plates straighten themselves and nobody asks why. If anything never goes out of style, it's you.",
      share: "Your share: three pieces, all dead centre, none crooked.",
    },
  },
  pastel: {
    tr: {
      name: "Pastel Neşe",
      tagline: "Ortamın ışığı",
      description:
        "Renkli bir kalabalığın en renkli yerisin. Kahkahan masanın bir ucundan ötekine ulaşır, en az bilinen şarkıyı bile herkese söyletirsin. Seninle sofra hiç sessiz kalmaz.",
      share: "Payına düşen: avuç dolusu, hepsi farklı renkte, hepsi dağıtılmak üzere.",
    },
    en: {
      name: "Pastel Joy",
      tagline: "The light of the room",
      description:
        "You're the most colourful spot in a colourful crowd. Your laugh travels from one end of the table to the other, and you can get everyone singing along. A table with you is never quiet.",
      share: "Your share: a fistful, every colour, all meant to be handed round.",
    },
  },
  citir: {
    tr: {
      name: "Çıtır Cesur",
      tagline: "Kıvrak ve maceracı",
      description:
        "Durmak sana göre değil; plan yoksa plan yaparsın, yol yoksa yol açarsın. Dışın çıtır, içinde sürpriz var. Arkadaşların seninle çıkınca “Nereye gidiyoruz?” diye sormayı bırakıyor.",
      share: "Payına düşen: bir avuç, ama yolda bitti. Çıtırtısı hâlâ kulaklarda.",
    },
    en: {
      name: "Crisp & Bold",
      tagline: "Quick and adventurous",
      description:
        "Standing still isn't your style: no plan means you make one, no road means you build one. Crisp outside, a surprise inside. Friends who head out with you stop asking “Where are we going?”",
      share: "Your share: a handful, gone before the end of the road. Still crunching in memory.",
    },
  },
  cayli: {
    tr: {
      name: "Çaylı Sohbet",
      tagline: "Nostaljik sohbet düşkünü",
      description:
        "Sana göre en iyi tarif, uzun bir muhabbetin yanında içilen demli bir çaydır. Eski hikâyeleri senden dinlemek ayrı keyif; “Bir saniye, şunu anlatayım” deyip bir saat geçirirsin ve kimse şikâyet etmez.",
      share: "Payına düşen: iki tane, tam bir bardak çayın yanına; çay soğursa tazelenir.",
    },
    en: {
      name: "Tea & Talk",
      tagline: "Nostalgic conversationalist",
      description:
        "To you the best recipe is a strong tea beside a long chat. Hearing old stories from you is a treat: you say “Let me just tell you this” and an hour passes with no complaints.",
      share: "Your share: two pieces beside a glass of tea; if it cools, it gets refreshed.",
    },
  },
};

export type QuizCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  disclaimer: string;
  back: string;
  home: string;
  optionsLabel: string;
  progressLabel: string; // "{n}" "{total}"
  retry: string;
  share: string;
  shareCopied: string;
  shareFailed: string;
  askAssistant: string;
  shareTitle: string;
  shareText: string; // "{name}" yer tutucusu
  teaser: { title: string; body: string; cta: string };
};

export const quizCopy: L<QuizCopy> = {
  tr: {
    metaTitle: "Hangi Badem Şekerisin?",
    metaDescription:
      "5 soruda hangi badem şekeri kişiliğine sahip olduğunu öğren. Eğlence amaçlı, cevaplar hiçbir yere gönderilmez.",
    title: "Hangi Badem Şekerisin?",
    lead: "Beş soru, bir dakika. Çayını al, cevapla, sofradaki yerini öğren.",
    disclaimer:
      "Eğlence amaçlıdır; gerçek çeşit veya üretici bilgisi değildir. Cevapların tarayıcından çıkmaz, hiçbir yere gönderilmez ve kaydedilmez.",
    back: "Geri",
    home: "Ana sayfaya dön",
    optionsLabel: "Cevap seçenekleri",
    progressLabel: "Soru {n} / {total}",
    retry: "Tekrar çöz",
    share: "Sonucu paylaş",
    shareCopied: "Kopyalandı",
    shareFailed: "Kopyalanamadı. Adres çubuğundaki bağlantıyı paylaşabilirsin.",
    askAssistant: "Gakkocan'a sor",
    shareTitle: "Hangi Badem Şekerisin?",
    shareText: "Ben “{name}” çıktım! Sen hangi badem şekerisin?",
    teaser: {
      title: "Hangi badem şekerisin?",
      body: "5 soru, 1 dakika.",
      cta: "Testi çöz",
    },
  },
  en: {
    metaTitle: "Which Almond Candy Are You?",
    metaDescription:
      "Find out which almond-candy personality you are in 5 questions. Just for fun; your answers are never sent anywhere.",
    title: "Which Almond Candy Are You?",
    lead: "Five questions, one minute. Grab your tea, answer, and find your place at the table.",
    disclaimer:
      "For fun only; not real variety or producer information. Your answers never leave your browser: they aren't sent or stored anywhere.",
    back: "Back",
    home: "Back to home",
    optionsLabel: "Answer options",
    progressLabel: "Question {n} / {total}",
    retry: "Take it again",
    share: "Share result",
    shareCopied: "Copied",
    shareFailed: "Couldn't copy. You can share the link from the address bar.",
    askAssistant: "Ask Gakkocan",
    shareTitle: "Which Almond Candy Are You?",
    shareText: "I got “{name}”! Which almond candy are you?",
    teaser: {
      title: "Which almond candy are you?",
      body: "5 questions, 1 minute.",
      cta: "Take the quiz",
    },
  },
};

export const QUIZ_SLUG = "hangi-badem-sekeri";

/** Puanları toplar; eşitlikte son sorunun şıkkına en yakın tip kazanır. */
export function scoreQuiz(answers: number[], questions = quizQuestions): QuizTypeId {
  const totals: Record<QuizTypeId, number> = { klasik: 0, pastel: 0, citir: 0, cayli: 0 };
  answers.forEach((choice, q) => {
    const option = questions[q]?.options[choice];
    if (!option) return;
    for (const id of quizTypeIds) totals[id] += option.weights[id] ?? 0;
  });
  const best = Math.max(...quizTypeIds.map((id) => totals[id]));
  const tied = quizTypeIds.filter((id) => totals[id] === best);
  if (tied.length === 1) return tied[0];
  // Eşitlik: en son cevaplardan geriye doğru bakarak kırılır.
  for (let q = answers.length - 1; q >= 0; q--) {
    const option = questions[q]?.options[answers[q]];
    if (!option) continue;
    const top = Math.max(...tied.map((id) => option.weights[id] ?? 0));
    const narrowed = tied.filter((id) => (option.weights[id] ?? 0) === top);
    if (top > 0 && narrowed.length === 1) return narrowed[0];
  }
  return tied[0];
}

export const pick = <T,>(value: L<T>, lang: Locale): T => value[lang];
