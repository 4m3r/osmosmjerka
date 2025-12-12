"use client";

import { useState, useCallback, useRef } from "react";
import { WordSearchPuzzle } from "@/lib/wordSearch";

interface WordGridProps {
  puzzle: WordSearchPuzzle;
  onWordFound: (word: string) => void;
  foundWords: Set<string>;
}

interface Cell {
  row: number;
  col: number;
}

export default function WordGrid({
  puzzle,
  onWordFound,
  foundWords,
}: WordGridProps) {
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some((cell) => cell.row === row && cell.col === col);
  };

  const isCellInFoundWord = (row: number, col: number) => {
    return puzzle.positions.some((pos) => {
      if (!foundWords.has(pos.word)) return false;

      const { rowDir, colDir } = getDirectionDeltas(pos.direction);
      for (let i = 0; i < pos.word.length; i++) {
        const cellRow = pos.start.row + i * rowDir;
        const cellCol = pos.start.col + i * colDir;
        if (cellRow === row && cellCol === col) return true;
      }
      return false;
    });
  };

  const getDirectionDeltas = (direction: string) => {
    switch (direction) {
      case "horizontal":
        return { rowDir: 0, colDir: 1 };
      case "vertical":
        return { rowDir: 1, colDir: 0 };
      case "diagonal-down":
        return { rowDir: 1, colDir: 1 };
      case "diagonal-up":
        return { rowDir: -1, colDir: 1 };
      default:
        return { rowDir: 0, colDir: 0 };
    }
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;

    if (selectedCells.length === 0) {
      setSelectedCells([{ row, col }]);
      return;
    }

    const firstCell = selectedCells[0];
    const newSelection = getCellsInLine(firstCell, { row, col });
    setSelectedCells(newSelection);
  };

  const handleMouseUp = () => {
    if (selectedCells.length > 1) {
      checkForWord();
    }
    setIsSelecting(false);
    setSelectedCells([]);
  };

  const getCellsInLine = (start: Cell, end: Cell): Cell[] => {
    const cells: Cell[] = [start];
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;

    // Determine direction
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    if (steps === 0) return cells;

    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    // Only allow straight lines (horizontal, vertical, diagonal)
    if (
      Math.abs(rowDiff) !== 0 &&
      Math.abs(colDiff) !== 0 &&
      Math.abs(rowDiff) !== Math.abs(colDiff)
    ) {
      return [start];
    }

    for (let i = 1; i <= steps; i++) {
      cells.push({
        row: start.row + i * rowStep,
        col: start.col + i * colStep,
      });
    }

    return cells;
  };

  const checkForWord = () => {
    const selectedWord = selectedCells
      .map((cell) => puzzle.grid[cell.row][cell.col])
      .join("");

    const reversedWord = selectedWord.split("").reverse().join("");

    if (puzzle.words.includes(selectedWord) && !foundWords.has(selectedWord)) {
      onWordFound(selectedWord);
    } else if (
      puzzle.words.includes(reversedWord) &&
      !foundWords.has(reversedWord)
    ) {
      onWordFound(reversedWord);
    }
  };

  const cellSize =
    puzzle.size <= 10
      ? "w-10 h-10 text-lg"
      : puzzle.size <= 15
      ? "w-8 h-8 text-base"
      : "w-6 h-6 text-sm";

  return (
    <div
      ref={gridRef}
      className="inline-block select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsSelecting(false);
        setSelectedCells([]);
      }}
    >
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))`,
        }}
      >
        {puzzle.grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const isSelected = isCellSelected(rowIndex, colIndex);
            const isFound = isCellInFoundWord(rowIndex, colIndex);

            return (
              <div
                key={getCellKey(rowIndex, colIndex)}
                className={`
                  ${cellSize}
                  flex items-center justify-center
                  font-bold rounded cursor-pointer
                  transition-colors duration-150
                  ${
                    isFound
                      ? "bg-green-400 text-white"
                      : isSelected
                      ? "bg-blue-400 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }
                `}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
