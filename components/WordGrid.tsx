"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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

  // Prevent page scrolling when interacting with grid
  useEffect(() => {
    const preventTouch = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest(".word-grid")) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventTouch, { passive: false });
    return () => document.removeEventListener("touchmove", preventTouch);
  }, []);

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

  const getFoundWordBorderClass = (row: number, col: number): string => {
    const foundPos = puzzle.positions.find((pos) => {
      if (!foundWords.has(pos.word)) return false;

      const { rowDir, colDir } = getDirectionDeltas(pos.direction);
      for (let i = 0; i < pos.word.length; i++) {
        const cellRow = pos.start.row + i * rowDir;
        const cellCol = pos.start.col + i * colDir;
        if (cellRow === row && cellCol === col) return true;
      }
      return false;
    });

    if (!foundPos) return "";

    const { rowDir, colDir } = getDirectionDeltas(foundPos.direction);
    const wordLength = foundPos.word.length;

    // Find which position this cell is in the word
    let position = -1;
    for (let i = 0; i < wordLength; i++) {
      const cellRow = foundPos.start.row + i * rowDir;
      const cellCol = foundPos.start.col + i * colDir;
      if (cellRow === row && cellCol === col) {
        position = i;
        break;
      }
    }

    if (position === -1) return "";

    const isFirst = position === 0;
    const isLast = position === wordLength - 1;

    // Build border classes based on direction and position
    let borders = "border-2 border-yellow-800";

    if (foundPos.direction === "horizontal") {
      borders += " border-t border-b";
      if (isFirst) borders += " border-l rounded-l-md";
      if (isLast) borders += " border-r rounded-r-md";
    } else if (foundPos.direction === "vertical") {
      borders += " border-l border-r";
      if (isFirst) borders += " border-t rounded-t-md";
      if (isLast) borders += " border-b rounded-b-md";
    } else {
      // Diagonal - add border on all sides for simplicity
      borders += " border";
      if (isFirst) borders += " rounded-tl-md rounded-bl-md";
      if (isLast) borders += " rounded-tr-md rounded-br-md";
    }

    return borders;
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

  const handleStart = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleMove = (row: number, col: number) => {
    if (!isSelecting) return;

    if (selectedCells.length === 0) {
      setSelectedCells([{ row, col }]);
      return;
    }

    const firstCell = selectedCells[0];
    const newSelection = getCellsInLine(firstCell, { row, col });
    setSelectedCells(newSelection);
  };

  const handleEnd = () => {
    if (selectedCells.length > 1) {
      checkForWord();
    }
    setIsSelecting(false);
    setSelectedCells([]);
  };

  const getTouchCell = (touch: React.Touch): Cell | null => {
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return null;

    const row = element.getAttribute("data-row");
    const col = element.getAttribute("data-col");

    if (row !== null && col !== null) {
      return { row: parseInt(row), col: parseInt(col) };
    }
    return null;
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
      ? "w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg"
      : puzzle.size <= 15
      ? "w-7 h-7 sm:w-8 sm:h-8 text-sm sm:text-base"
      : "w-5 h-5 sm:w-6 sm:h-6 text-xs sm:text-sm";

  return (
    <div
      ref={gridRef}
      className="word-grid inline-block select-none touch-none overscroll-none"
      onMouseUp={handleEnd}
      onMouseLeave={() => {
        setIsSelecting(false);
        setSelectedCells([]);
      }}
      onTouchEnd={handleEnd}
      onTouchCancel={() => {
        setIsSelecting(false);
        setSelectedCells([]);
      }}
    >
      <div
        className="grid gap-0.5 sm:gap-1 bg-white p-2 rounded-lg shadow-md"
        style={{
          gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))`,
        }}
      >
        {puzzle.grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const isSelected = isCellSelected(rowIndex, colIndex);
            const isFound = isCellInFoundWord(rowIndex, colIndex);
            const borderClass = isFound
              ? getFoundWordBorderClass(rowIndex, colIndex)
              : "";

            return (
              <div
                key={getCellKey(rowIndex, colIndex)}
                data-row={rowIndex}
                data-col={colIndex}
                className={`
                  ${cellSize}
                  flex items-center justify-center
                  font-bold cursor-pointer
                  transition-colors duration-100
                  active:scale-95
                  relative
                  ${borderClass}
                  ${
                    isSelected
                      ? "bg-blue-400 text-white shadow-sm"
                      : "bg-gray-100 active:bg-gray-200 text-gray-800"
                  }
                `}
                onMouseDown={() => handleStart(rowIndex, colIndex)}
                onMouseEnter={() => handleMove(rowIndex, colIndex)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleStart(rowIndex, colIndex);
                }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const cell = getTouchCell(touch);
                  if (cell) handleMove(cell.row, cell.col);
                }}
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
