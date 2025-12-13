export type Language = "bs" | "en";

export interface Translations {
  title: string;
  subtitle: string;
  category: string;
  difficulty: string;
  easy: string;
  medium: string;
  hard: string;
  newGame: string;
  time: string;
  points: string;
  score: string;
  wordsToFind: string;
  found: string;
  congratulations: string;
  foundAllWords: string;
  loading: string;
}

export const translations: Record<Language, Translations> = {
  bs: {
    title: "🔍 Osmosmjerka",
    subtitle: "Pronađi skrivene riječi u mreži!",
    category: "Kategorija",
    difficulty: "Težina",
    easy: "Lako",
    medium: "Srednje",
    hard: "Teško",
    newGame: "🎮 Nova Igra",
    time: "⏱️ Vrijeme:",
    points: "⭐ Bodovi:",
    score: "Rezultat",
    wordsToFind: "Riječi za Pronaći",
    found: "Pronađeno:",
    congratulations: "🎉 Čestitamo! 🎉",
    foundAllWords: "Pronašli ste sve riječi za",
    loading: "Učitavanje...",
  },
  en: {
    title: "🔍 Word Search",
    subtitle: "Find all hidden words in the grid!",
    category: "Category",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    newGame: "🎮 New Game",
    time: "⏱️ Time:",
    points: "⭐ Points:",
    score: "Score", 
    wordsToFind: "Words to Find",
    found: "Found:",
    congratulations: "🎉 Congratulations! 🎉",
    foundAllWords: "You found all words in",
    loading: "Loading...",
  },
};
