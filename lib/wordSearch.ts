export interface WordSearchPuzzle {
  grid: string[][];
  words: string[];
  positions: WordPosition[];
  size: number;
}

export interface WordPosition {
  word: string;
  start: { row: number; col: number };
  end: { row: number; col: number };
  direction: Direction;
}

export type Direction =
  | "horizontal"
  | "vertical"
  | "diagonal-down"
  | "diagonal-up";

export type Difficulty = "easy" | "medium" | "hard";

const GRID_SIZES: Record<Difficulty, number> = {
  easy: 10,
  medium: 15,
  hard: 20,
};

const BOSNIAN_LETTERS = "ABCDEFGHIJKLMNOPQRSŠTUVZŽĆČĐ";

export function generateWordSearch(
  words: string[],
  difficulty: Difficulty = "medium"
): WordSearchPuzzle {
  const size = GRID_SIZES[difficulty];
  const grid: string[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));

  const positions: WordPosition[] = [];
  const uppercaseWords = words.map((w) => w.toUpperCase());
  const placedWords: string[] = [];

  // Try to place each word
  for (const word of uppercaseWords) {
    const placed = placeWord(grid, word, size);
    if (placed) {
      positions.push(placed);
      placedWords.push(word);
    }
  }

  // Fill empty cells with random letters
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === "") {
        grid[i][j] =
          BOSNIAN_LETTERS[Math.floor(Math.random() * BOSNIAN_LETTERS.length)];
      }
    }
  }

  return {
    grid,
    words: placedWords,
    positions,
    size,
  };
}

function placeWord(
  grid: string[][],
  word: string,
  size: number
): WordPosition | null {
  const directions: Direction[] = [
    "horizontal",
    "vertical",
    "diagonal-down",
    "diagonal-up",
  ];

  // Shuffle directions for randomness
  const shuffledDirections = directions.sort(() => Math.random() - 0.5);

  for (const direction of shuffledDirections) {
    const attempts = 100; // Try multiple random positions

    for (let attempt = 0; attempt < attempts; attempt++) {
      const { row, col } = getRandomPosition(size);

      if (canPlaceWord(grid, word, row, col, direction, size)) {
        placeWordInGrid(grid, word, row, col, direction);
        return {
          word,
          start: { row, col },
          end: getEndPosition(row, col, word.length, direction),
          direction,
        };
      }
    }
  }

  return null;
}

function getRandomPosition(size: number): { row: number; col: number } {
  return {
    row: Math.floor(Math.random() * size),
    col: Math.floor(Math.random() * size),
  };
}

function canPlaceWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction,
  size: number
): boolean {
  const { rowDir, colDir } = getDirectionDeltas(direction);

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * rowDir;
    const newCol = col + i * colDir;

    // Check bounds
    if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
      return false;
    }

    // Check if cell is empty or has the same letter
    if (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWordInGrid(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
): void {
  const { rowDir, colDir } = getDirectionDeltas(direction);

  for (let i = 0; i < word.length; i++) {
    grid[row + i * rowDir][col + i * colDir] = word[i];
  }
}

function getDirectionDeltas(direction: Direction): {
  rowDir: number;
  colDir: number;
} {
  switch (direction) {
    case "horizontal":
      return { rowDir: 0, colDir: 1 };
    case "vertical":
      return { rowDir: 1, colDir: 0 };
    case "diagonal-down":
      return { rowDir: 1, colDir: 1 };
    case "diagonal-up":
      return { rowDir: -1, colDir: 1 };
  }
}

function getEndPosition(
  row: number,
  col: number,
  length: number,
  direction: Direction
): { row: number; col: number } {
  const { rowDir, colDir } = getDirectionDeltas(direction);
  return {
    row: row + (length - 1) * rowDir,
    col: col + (length - 1) * colDir,
  };
}
