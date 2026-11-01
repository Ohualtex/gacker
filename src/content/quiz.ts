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
      tr: "Kapı çaldı, kapıda hiç beklemediğin misafirler. İlk refleksin?",
      en: "The doorbell rings: guests you weren't expecting. Your first reflex?",
    },
    options: [
      {
        text: {
          tr: "Çaydanlık çoktan ocakta. “Önce bir çay, sonra konuşuruz.”",
          en: "The kettle is already on. “Tea first, talk later.”",
        },
        weights: { cayli: 2, klasik: 1 },
      },
      {
        text: {
          tr: "En güzel örtüyü çıkarır, her şeyi yerli yerine koyarım.",
          en: "I bring out the nicest tablecloth and put everything in its place.",
        },
        weights: { klasik: 2, cayli: 1 },
      },
      {
        text: {
          tr: "Müziği açar, “Hoş geldiniz!” diye herkesi kucaklarım.",
          en: "I turn the music up and greet everyone with a hug.",
        },
        weights: { pastel: 2, citir: 1 },
      },
      {
        text: {
          tr: "“Evde oturmayalım, hadi çıkalım!” diyerek planı değiştiririm.",
          en: "“Let's not sit at home, let's go out!” and the plan changes.",
        },
        weights: { citir: 2, pastel: 1 },
      },
    ],
  },
  {
    prompt: {
      tr: "Halay başladı. Sen halayın neresindesin?",
      en: "The halay (line dance) begins. Where are you in the line?",
    },
    options: [
      {
        text: {
          tr: "En başta, mendil elimde. Ortamın tonunu ben belirlerim.",
          en: "At the very front, handkerchief in hand. I set the mood.",
        },
        weights: { pastel: 2, citir: 1 },
      },
      {
        text: {
          tr: "Ortada, adımı şaşırmadan. Halayın sağlam omurgasıyım.",
          en: "In the middle, never missing a step. The steady backbone of the line.",
        },
        weights: { klasik: 2, cayli: 1 },
      },
      {
        text: {
          tr: "Sonda, ama en hızlı adımlar bende. Tempo yükselsin!",
          en: "At the end, but with the fastest footwork. Faster, please!",
        },
        weights: { citir: 2, pastel: 1 },
      },
      {
        text: {
          tr: "Kenarda, çayım elimde. Alkışla eşlik ederim, sohbet de bedava.",
          en: "On the side with my tea, clapping along. Conversation included.",
        },
        weights: { cayli: 2, klasik: 1 },
      },
    ],
  },
  {
    prompt: {
      tr: "Hafta sonu için en çok hangi plan içini ısıtır?",
      en: "Which weekend plan warms your heart the most?",
    },
    options: [
      {
        text: {
          tr: "Uzun bir kahvaltı, bitmeyen çay ve “ne anlatıyordum ben?”",
          en: "A long breakfast, endless tea and “what was I saying?”",
        },
        weights: { cayli: 2, pastel: 1 },
      },
      {
        text: {
          tr: "Sakin bir ev günü: bildik kitap, bildik koltuk, bildik huzur.",
          en: "A quiet day at home: familiar book, familiar armchair, familiar calm.",
        },
        weights: { klasik: 2, cayli: 1 },
      },
      {
        text: {
          tr: "Kalabalık bir davet, bol fotoğraf, bol kahkaha.",
          en: "A lively get-together with plenty of photos and laughter.",
        },
        weights: { pastel: 2, klasik: 1 },
      },
      {
        text: {
          tr: "Haritada hiç görmediğim bir yol. Nereye çıkarsa!",
          en: "A road I've never seen on the map. Wherever it leads!",
        },
        weights: { citir: 2, cayli: 1 },
      },
    ],
  },
  {
    prompt: {
      tr: "Arkadaşının canı sıkkın. Ne yaparsın?",
      en: "A friend is feeling down. What do you do?",
    },
    options: [
      {
        text: {
          tr: "Yanına oturur, saatlerce dinlerim. Çay da tazelenir tabii.",
          en: "I sit beside them and listen for hours. Fresh tea, of course.",
        },
        weights: { cayli: 2, klasik: 1 },
      },
      {
        text: {
          tr: "Sakin ve güvenilir bir omuz olurum. Ne gerekiyorsa çözülür.",
          en: "I'm a calm, reliable shoulder. Whatever needs sorting gets sorted.",
        },
        weights: { klasik: 2, citir: 1 },
      },
      {
        text: {
          tr: "Güldürürüm. Bir espri, bir şarkı, hava hemen dağılır.",
          en: "I make them laugh. A joke, a song, and the clouds clear.",
        },
        weights: { pastel: 2, cayli: 1 },
      },
      {
        text: {
          tr: "Elinden tutarım: “Kalk, bir yere gidiyoruz!”",
          en: "I take their hand: “Get up, we're going somewhere!”",
        },
        weights: { citir: 2, pastel: 1 },
      },
    ],
  },
  {
    prompt: {
      tr: "Hangi cümle seni daha çok anlatıyor?",
      en: "Which sentence sounds most like you?",
    },
    options: [
      {
        text: {
          tr: "“Sade olan kalıcıdır.”",
          en: "“Simple things last.”",
        },
        weights: { klasik: 2, citir: 1 },
      },
      {
        text: {
          tr: "“Güzel günler paylaşınca güzeldir.”",
          en: "“Good days are better shared.”",
        },
        weights: { pastel: 2, cayli: 1 },
      },
      {
        text: {
          tr: "“Hayat kısa, denemediğin lezzet kalmasın.”",
          en: "“Life is short, leave no flavor untried.”",
        },
        weights: { citir: 2, klasik: 1 },
      },
      {
        text: {
          tr: "“Bir çay daha içersek anlatırım…”",
          en: "“One more tea and I'll tell you the story…”",
        },
        weights: { cayli: 2, pastel: 1 },
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
