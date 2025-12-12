import { Translations } from "@/data/translations";

interface WordListProps {
  words: string[];
  foundWords: Set<string>;
  translations: Translations;
}

export default function WordList({
  words,
  foundWords,
  translations: t,
}: WordListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">
        {t.wordsToFind}
      </h2>
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {words.map((word) => (
          <div
            key={word}
            className={`
              px-2 sm:px-3 py-1.5 sm:py-2 rounded text-center font-medium transition-all duration-300 text-sm sm:text-base
              ${
                foundWords.has(word)
                  ? "bg-green-100 text-green-700 line-through"
                  : "bg-gray-100 text-gray-700"
              }
            `}
          >
            {word}
          </div>
        ))}
      </div>
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600">
          {t.found}{" "}
          <span className="font-bold text-green-600">{foundWords.size}</span> /{" "}
          {words.length}
        </p>
      </div>
    </div>
  );
}
