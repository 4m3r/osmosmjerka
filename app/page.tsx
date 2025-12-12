"use client";

import { useState, useEffect, useCallback } from "react";
import { generateWordSearch } from "@/lib/wordSearch";
import { WORD_CATEGORIES } from "@/data/words";
import WordGrid from "@/components/WordGrid";
import WordList from "@/components/WordList";
import GameControls from "@/components/GameControls";
import type { WordSearchPuzzle, Difficulty } from "@/lib/wordSearch";

export default function Home() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [categoryName, setCategoryName] = useState(WORD_CATEGORIES[0].name);
  const [puzzle, setPuzzle] = useState<WordSearchPuzzle | null>(null);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const createNewPuzzle = useCallback(() => {
    const category = WORD_CATEGORIES.find((cat) => cat.name === categoryName);
    if (!category) return;

    const newPuzzle = generateWordSearch(category.words, difficulty);
    setPuzzle(newPuzzle);
    setFoundWords(new Set());
    setScore(0);
    setTime(0);
    setIsGameComplete(false);
  }, [categoryName, difficulty]);

  useEffect(() => {
    createNewPuzzle();
  }, [createNewPuzzle]);

  useEffect(() => {
    if (!puzzle || isGameComplete) return;

    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [puzzle, isGameComplete]);

  useEffect(() => {
    if (
      puzzle &&
      foundWords.size === puzzle.words.length &&
      puzzle.words.length > 0
    ) {
      setIsGameComplete(true);
    }
  }, [foundWords, puzzle]);

  const handleWordFound = (word: string) => {
    if (!foundWords.has(word)) {
      setFoundWords(new Set([...foundWords, word]));
      setScore(score + word.length * 10);
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategoryName(newCategory);
  };

  if (!puzzle) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Učitavanje...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-1 sm:mb-2">
            🔍 Osmosmjerka
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg">
            Pronađi skrivene riječi u mreži!
          </p>
        </header>

        {isGameComplete && (
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 sm:p-6 mb-4 sm:mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
              🎉 Čestitamo! 🎉
            </h2>
            <p className="text-green-600 text-sm sm:text-base">
              Pronašli ste sve riječi za {time} sekundi!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 flex justify-center overflow-x-auto pb-4">
            <WordGrid
              puzzle={puzzle}
              onWordFound={handleWordFound}
              foundWords={foundWords}
            />
          </div>

          <div className="space-y-4 sm:space-y-6 lg:order-last order-first">
            <GameControls
              difficulty={difficulty}
              onDifficultyChange={handleDifficultyChange}
              onNewGame={createNewPuzzle}
              category={categoryName}
              categories={WORD_CATEGORIES.map((cat) => cat.name)}
              onCategoryChange={handleCategoryChange}
              score={score}
              time={time}
            />
            <WordList words={puzzle.words} foundWords={foundWords} />
          </div>
        </div>
      </div>
    </div>
  );
}
