import { Language } from "@/data/translations";
import { Difficulty, WordSearchPuzzle } from "@/lib/wordSearch";

interface GameState {
  language: Language;
  difficulty: Difficulty;
  categoryName: string;
  foundWords: string[];
  score: number;
  time: number;
  puzzle: WordSearchPuzzle | null;
  savedAt: number;
}

const STORAGE_KEY = "osmosmjerka_game_state";

export function saveGameState(state: Omit<GameState, "savedAt">): void {
  try {
    const stateWithTimestamp: GameState = {
      ...state,
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateWithTimestamp));
  } catch (error) {
    console.error("Failed to save game state:", error);
  }
}

export function loadGameState(): GameState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const state: GameState = JSON.parse(stored);

    // Only load if saved within last 7 days
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - state.savedAt > sevenDaysInMs) {
      clearGameState();
      return null;
    }

    return state;
  } catch (error) {
    console.error("Failed to load game state:", error);
    return null;
  }
}

export function clearGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear game state:", error);
  }
}
