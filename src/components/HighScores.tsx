import { useEffect, useState } from 'react';

interface Score {
  name: string;
  score: number;
}

const HighScores = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('quiz-scores') || '[]');
    const sorted = stored.sort((a: Score, b: Score) => b.score - a.score).slice(0, 5);
    setScores(sorted);
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-md w-full max-w-xs">
      <h2 className="text-xl font-bold mb-2 text-center">🏆 High Scores</h2>
      <ul className="space-y-1">
        {scores.map((entry, i) => (
          <li key={i} className="flex justify-between">
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighScores;
