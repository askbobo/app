import { useState, useEffect } from 'react';
import data from '../data/B-Dic.json';
import { DictionaryEntry } from '../types';

const Flashcard = () => {
  const entries = data as DictionaryEntry[];
  const [name, setName] = useState('');
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Load name and known progress from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('flashcard-name');
    const savedKnown = localStorage.getItem('flashcard-known');
    if (savedName) setName(savedName);
    if (savedKnown) setKnown(new Set(JSON.parse(savedKnown)));
  }, []);

  // Save known progress and name
  useEffect(() => {
    localStorage.setItem('flashcard-known', JSON.stringify(Array.from(known)));
    if (name) localStorage.setItem('flashcard-name', name);
  }, [known, name]);

  const getNextIndex = (): number | null => {
    const unknownIndices = entries
      .map((_, i) => i)
      .filter((i) => !known.has(i));
    if (unknownIndices.length === 0) return null;
    const random = Math.floor(Math.random() * unknownIndices.length);
    return unknownIndices[random];
  };

  const start = () => {
    const idx = getNextIndex();
    setCurrentIndex(idx);
    setIsFlipped(false);
  };

  const handleKnow = () => {
    if (currentIndex === null) return;
    const updated = new Set(known);
    updated.add(currentIndex);
    setKnown(updated);
    start();
  };

  const handleDontKnow = () => {
    start();
  };

  const resetProgress = () => {
    setKnown(new Set());
    setCurrentIndex(null);
    localStorage.removeItem('flashcard-known');
  };

  useEffect(() => {
    if (name) start();
  }, [name]);

  const entry = currentIndex !== null ? entries[currentIndex] : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {!name ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">What's your name?</h2>
          <input
            type="text"
            className="p-2 rounded border dark:bg-gray-700 dark:text-white"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      ) : known.size >= entries.length ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">🎉 Well done, {name}!</h2>
          <p>You’ve completed all flashcards.</p>
          <button
            onClick={resetProgress}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reset Progress
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-xl w-full">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer h-64 bg-white dark:bg-gray-800 shadow-2xl rounded-xl flex items-center justify-center p-6 transition-transform transform hover:scale-105"
          >
            {!isFlipped ? (
              <p className="text-3xl font-bold">{entry?.Bukharian}</p>
            ) : (
              <div className="text-left text-base space-y-1">
                <p><strong>English:</strong> {entry?.English}</p>
                <p><strong>Russian:</strong> {entry?.Russian}</p>
                <p><strong>Latin:</strong> {entry?.Latin}</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleKnow}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              I know this
            </button>
            <button
              onClick={handleDontKnow}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              I don't know this
            </button>
          </div>

          <button
            onClick={resetProgress}
            className="mt-4 text-sm text-blue-500 underline"
          >
            Reset Progress
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
