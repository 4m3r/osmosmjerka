import { Difficulty } from "@/lib/wordSearch";

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  category: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  score: number;
  time: number;
}

export default function GameControls({
  difficulty,
  onDifficultyChange,
  onNewGame,
  category,
  categories,
  onCategoryChange,
  score,
  time,
}: GameControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategorija
        </label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Težina
        </label>
        <div className="flex gap-2">
          {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level)}
              className={`
                flex-1 px-4 py-2 rounded-md font-medium transition-colors
                ${
                  difficulty === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
            >
              {level === "easy"
                ? "Lako"
                : level === "medium"
                ? "Srednje"
                : "Teško"}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onNewGame}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        🎮 Nova Igra
      </button>

      <div className="pt-4 border-t border-gray-200 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">⏱️ Vrijeme:</span>
          <span className="font-bold text-blue-600">{formatTime(time)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">⭐ Bodovi:</span>
          <span className="font-bold text-green-600">{score}</span>
        </div>
      </div>
    </div>
  );
}
