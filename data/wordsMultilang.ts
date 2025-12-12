import { Language } from "./translations";

export interface WordCategory {
  name: string;
  words: string[];
}

export const WORD_CATEGORIES_BY_LANGUAGE: Record<Language, WordCategory[]> = {
  bs: [
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
        "tigar",
        "majmun",
        "delfin",
        "kit",
        "kornjača",
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
        "mango",
        "kajsija",
        "smokva",
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
        "zlatna",
        "srebrna",
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
        "deda",
        "ujak",
        "tetka",
        "amidža",
        "stric",
        "ujna",
        "strina",
      ],
    },
    {
      name: "Škola",
      words: [
        "škola",
        "učitelj",
        "knjiga",
        "olovka",
        "bilježnica",
        "tabla",
        "klupa",
        "torba",
        "lineai",
        "gumice",
        "šestari",
        "bojice",
        "pero",
        "kalkulator",
        "mapa",
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
        "duha",
        "oluja",
      ],
    },
    {
      name: "Hrana",
      words: [
        "hleb",
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
        "pita",
        "ćevapi",
      ],
    },
    {
      name: "Sport",
      words: [
        "fudbal",
        "košarka",
        "odbojka",
        "rukomet",
        "tenis",
        "plivanje",
        "trčanje",
        "skijanje",
        "bicikl",
        "lopta",
        "gol",
        "tim",
        "igra",
      ],
    },
    {
      name: "Vozila",
      words: [
        "auto",
        "autobus",
        "kamion",
        "bicikl",
        "motor",
        "avion",
        "brod",
        "tramvaj",
        "voz",
        "helikopter",
        "taksi",
      ],
    },
    {
      name: "Tijelo",
      words: [
        "glava",
        "ruka",
        "noga",
        "oko",
        "uho",
        "nos",
        "usta",
        "zub",
        "srce",
        "prst",
        "kosa",
      ],
    },
  ],
  en: [
    {
      name: "Stranger Things",
      words: [
        "eleven",
        "demogorgon",
        "hawkins",
        "upsidedown",
        "mindflayer",
        "dustin",
        "mike",
        "will",
        "lucas",
        "max",
        "steve",
        "hopper",
        "joyce",
        "nancy",
        "vecna",
        "eddie",
        "robin",
        "erica",
      ],
    },
    {
      name: "Animals",
      words: [
        "dog",
        "cat",
        "horse",
        "cow",
        "sheep",
        "bird",
        "fish",
        "lion",
        "elephant",
        "bear",
        "wolf",
        "rabbit",
        "mouse",
        "giraffe",
        "zebra",
        "tiger",
        "monkey",
        "dolphin",
        "whale",
        "turtle",
      ],
    },
    {
      name: "Fruits",
      words: [
        "apple",
        "pear",
        "banana",
        "orange",
        "strawberry",
        "cherry",
        "watermelon",
        "melon",
        "grape",
        "peach",
        "plum",
        "lemon",
        "pineapple",
        "kiwi",
        "mango",
        "apricot",
      ],
    },
    {
      name: "Colors",
      words: [
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "purple",
        "pink",
        "brown",
        "black",
        "white",
        "gray",
        "gold",
        "silver",
      ],
    },
    {
      name: "Family",
      words: [
        "mom",
        "dad",
        "brother",
        "sister",
        "grandma",
        "grandpa",
        "uncle",
        "aunt",
        "cousin",
        "nephew",
        "niece",
      ],
    },
    {
      name: "School",
      words: [
        "school",
        "teacher",
        "book",
        "pencil",
        "notebook",
        "board",
        "desk",
        "bag",
        "ruler",
        "eraser",
        "compass",
        "crayons",
        "pen",
        "calculator",
      ],
    },
    {
      name: "Nature",
      words: [
        "tree",
        "flower",
        "grass",
        "mountain",
        "river",
        "sea",
        "sun",
        "moon",
        "star",
        "cloud",
        "rain",
        "snow",
        "wind",
        "rainbow",
        "storm",
      ],
    },
    {
      name: "Food",
      words: [
        "bread",
        "cheese",
        "milk",
        "egg",
        "meat",
        "fish",
        "cake",
        "chocolate",
        "icecream",
        "soup",
        "salad",
        "pizza",
        "burger",
        "pasta",
        "rice",
      ],
    },
    {
      name: "Sports",
      words: [
        "soccer",
        "basketball",
        "volleyball",
        "tennis",
        "swimming",
        "running",
        "skiing",
        "cycling",
        "baseball",
        "golf",
        "hockey",
        "boxing",
      ],
    },
    {
      name: "Vehicles",
      words: [
        "car",
        "bus",
        "truck",
        "bicycle",
        "motorcycle",
        "airplane",
        "boat",
        "train",
        "helicopter",
        "taxi",
        "subway",
      ],
    },
    {
      name: "Body Parts",
      words: [
        "head",
        "hand",
        "foot",
        "eye",
        "ear",
        "nose",
        "mouth",
        "tooth",
        "heart",
        "finger",
        "hair",
        "leg",
        "arm",
      ],
    },
  ],
};

// Cache for mixed categories to prevent regeneration on every render
const mixedCategoryCache: Record<Language, WordCategory | null> = {
  bs: null,
  en: null,
};

export function getMixedCategory(
  language: Language,
  forceNew: boolean = false
): WordCategory {
  // Return cached version unless forcing new
  if (!forceNew && mixedCategoryCache[language]) {
    return mixedCategoryCache[language]!;
  }

  const categories = WORD_CATEGORIES_BY_LANGUAGE[language];
  const allWords: string[] = [];

  // Collect all words from all categories
  categories.forEach((category) => {
    allWords.push(...category.words);
  });

  // Shuffle and pick 18 random words
  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  const selectedWords = shuffled.slice(0, 18);

  const mixedCategory = {
    name: language === "bs" ? "Miješano" : "Mixed",
    words: selectedWords,
  };

  // Cache the result
  mixedCategoryCache[language] = mixedCategory;

  return mixedCategory;
}

export function getCategoriesWithMixed(language: Language): WordCategory[] {
  return [getMixedCategory(language), ...WORD_CATEGORIES_BY_LANGUAGE[language]];
}

export function regenerateMixedCategory(language: Language): void {
  mixedCategoryCache[language] = null;
}
