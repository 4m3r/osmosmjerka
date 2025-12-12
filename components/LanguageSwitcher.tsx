import { Language } from "@/data/translations";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) {
  return (
    <div className="flex gap-2 justify-center mb-4">
      <button
        onClick={() => onLanguageChange("bs")}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all active:scale-95
          ${
            currentLanguage === "bs"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 active:bg-gray-300"
          }
        `}
      >
        🇧🇦 Bosanski
      </button>
      <button
        onClick={() => onLanguageChange("en")}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all active:scale-95
          ${
            currentLanguage === "en"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 active:bg-gray-300"
          }
        `}
      >
        🇬🇧 English
      </button>
    </div>
  );
}
