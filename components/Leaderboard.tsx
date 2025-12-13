"use client";

import { useState, useEffect } from "react";
import { getTopScores, LeaderboardEntry } from "@/lib/supabase";
import { Language } from "@/data/translations";

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  difficulty: string;
  category: string;
  language: Language;
}

export default function Leaderboard({
  isOpen,
  onClose,
  difficulty,
  category,
  language,
}: LeaderboardProps) {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadScores();
    }
  }, [isOpen, difficulty, category]);

  const loadScores = async () => {
    setLoading(true);
    try {
      const data = await getTopScores(difficulty, category, 10);
      setScores(data || []);
    } catch (error) {
      console.error("Failed to load leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🏆 {language === "bs" ? "Rang lista" : "Leaderboard"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold">
              {language === "bs" ? "Težina" : "Difficulty"}:
            </span>{" "}
            {difficulty}
          </p>
          <p>
            <span className="font-semibold">
              {language === "bs" ? "Kategorija" : "Category"}:
            </span>{" "}
            {category}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            {language === "bs" ? "Učitavanje..." : "Loading..."}
          </div>
        ) : scores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {language === "bs"
              ? "Još nema rezultata. Budite prvi!"
              : "No scores yet. Be the first!"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-2 text-gray-700">#</th>
                  <th className="text-left py-2 px-2 text-gray-700">
                    {language === "bs" ? "Ime" : "Name"}
                  </th>
                  <th className="text-left py-2 px-2 text-gray-700">
                    {language === "bs" ? "Vrijeme" : "Time"}
                  </th>
                  <th className="text-left py-2 px-2 text-gray-700">
                    {language === "bs" ? "Bodovi" : "Score"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-gray-200 ${
                      index < 3 ? "bg-yellow-50" : ""
                    }`}
                  >
                    <td className="py-2 px-2 font-semibold text-gray-700">
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : index + 1}
                    </td>
                    <td className="py-2 px-2 text-gray-800">
                      {entry.player_name ||
                        (language === "bs" ? "Anoniman" : "Anonymous")}
                    </td>
                    <td className="py-2 px-2 text-gray-800">
                      {formatTime(entry.completion_time)}
                    </td>
                    <td className="py-2 px-2 text-gray-800">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            {language === "bs" ? "Zatvori" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
