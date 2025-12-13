export interface WordCategory {
  name: string;
  words: string[];
}

export const WORD_CATEGORIES: WordCategory[] = [
  {
    name: "Životinje",
    words: [
      "pas",
      "mačka",
      "konj",
      "krava",
      "ovca",
      "ptica",
      "riba",
      "lav",
      "slon",
      "medvjed",
      "vuk",
      "zec",
      "miš",
      "žirafa",
      "zebra",
    ],
  },
  {
    name: "Voće",
    words: [
      "jabuka",
      "kruška",
      "banana",
      "narandža",
      "jagoda",
      "višnja",
      "lubenica",
      "dinja",
      "grožđe",
      "breskva",
      "šljiva",
      "limun",
      "ananas",
      "kivi",
    ],
  },
  {
    name: "Boje",
    words: [
      "crvena",
      "plava",
      "zelena",
      "žuta",
      "narandžasta",
      "ljubičasta",
      "roze",
      "smeđa",
      "crna",
      "bijela",
      "siva",
    ],
  },
  {
    name: "Porodica",
    words: [
      "mama",
      "tata",
      "brat",
      "sestra",
      "baka",
      "djed",
      "ujak",
      "tetka",
      "amidža",
      "stric",
      "ujna",
      "strina",
    ],
  },
  {
    name: "School - Škola",
    words: [
      "škola",
      "učitelj",
      "knjiga",
      "olovka",
      "bilježnica",
      "tabla",
      "klupa",
      "torba",
      "linear",
      "gumice",
      "šestari",
      "bojice",
    ],
  },
  {
    name: "Priroda",
    words: [
      "drvo",
      "cvijet",
      "trava",
      "planina",
      "rijeka",
      "more",
      "sunce",
      "mjesec",
      "zvijezda",
      "oblak",
      "kiša",
      "snijeg",
      "vjetar",
    ],
  },
  {
    name: "Hrana",
    words: [
      "hljeb",
      "sir",
      "mlijeko",
      "jaje",
      "meso",
      "riba",
      "kolač",
      "čokolada",
      "sladoled",
      "juha",
      "salata",
      "pizza",
      "burek",
    ],
  },
];

export function getRandomCategory(): WordCategory {
  return WORD_CATEGORIES[Math.floor(Math.random() * WORD_CATEGORIES.length)];
}

export function getCategoryByName(name: string): WordCategory | undefined {
  return WORD_CATEGORIES.find((cat) => cat.name === name);
}
