"use client";

import { useState } from "react";
import { submitScore } from "@/lib/supabase";
import { translations, Language } from "@/data/translations";

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  time: number;
  score: number;
  difficulty: string;
  category: string;
  language: Language;
}

export default function CompletionModal({
  isOpen,
  onClose,
  time,
  score,
  difficulty,
  category,
  language,
}: CompletionModalProps) {
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = translations[language];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitScore({
        player_name: playerName.trim() || null,
        completion_time: time,
        difficulty,
        category,
        score,
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setPlayerName("");
      }, 2000);
    } catch (error) {
      console.error("Failed to submit score:", error);
      alert("Failed to submit score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🎉 {language === "bs" ? "Čestitamo!" : "Congratulations!"}
        </h2>

        <div className="space-y-3 mb-6">
          <p className="text-center text-gray-700">
            <span className="font-semibold">{t.score}:</span> {score}
          </p>
          <p className="text-center text-gray-700">
            <span className="font-semibold">{t.time}:</span>{" "}
            {minutes > 0 ? `${minutes}m ` : ""}
            {seconds}s
          </p>
        </div>

        {!submitted ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "bs"
                  ? "Vaše ime (opciono)"
                  : "Your name (optional)"}
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={
                  language === "bs" ? "Unesite ime..." : "Enter name..."
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                maxLength={30}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                {isSubmitting
                  ? language === "bs"
                    ? "Slanje..."
                    : "Submitting..."
                  : language === "bs"
                  ? "Pošalji rezultat"
                  : "Submit Score"}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                {language === "bs" ? "Zatvori" : "Close"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold text-lg">
              ✓{" "}
              {language === "bs"
                ? "Rezultat poslat!"
                : "Score submitted successfully!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
