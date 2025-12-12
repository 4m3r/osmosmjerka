interface WordListProps {
  words: string[];
  foundWords: Set<string>;
}

export default function WordList({ words, foundWords }: WordListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Riječi za Pronaći
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {words.map((word) => (
          <div
            key={word}
            className={`
              px-3 py-2 rounded text-center font-medium transition-all duration-300
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
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Pronađeno:{" "}
          <span className="font-bold text-green-600">{foundWords.size}</span> /{" "}
          {words.length}
        </p>
      </div>
    </div>
  );
}
