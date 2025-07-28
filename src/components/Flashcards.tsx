import { useState, useEffect } from 'react';
import data from '../data/B-Dic.json';
import { DictionaryEntry } from '../types';

const Flashcard = () => {
  const entries = data as DictionaryEntry[];
  const [isFlipped, setIsFlipped] = useState(false);
  const [word, setWord] = useState<DictionaryEntry | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * entries.length);
    setWord(entries[randomIndex]);
  }, []);

  if (!word) return null;

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="cursor-pointer w-80 h-48 bg-white dark:bg-gray-800 text-center shadow-xl rounded-xl flex items-center justify-center p-4 transition-transform transform hover:scale-105"
    >
      {!isFlipped ? (
        <p className="text-2xl font-bold">{word.Bukharian}</p>
      ) : (
        <div className="text-left space-y-1">
          <p><strong>English:</strong> {word.English}</p>
          <p><strong>Russian:</strong> {word.Russian}</p>
          <p><strong>Latin:</strong> {word.Latin}</p>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
