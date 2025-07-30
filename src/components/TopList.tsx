import {useEffect, useState} from 'react';

interface Score {
    name: string;
    score: number;
}

interface TopListProps {
    storageKey: string;
    title: string;
}

const TopList = ({storageKey, title}: TopListProps) => {
    const [scores, setScores] = useState<Score[]>([]);

    const defaultScores: Score[] = [
        {name: 'Alex', score: 50},
        {name: 'Moshe', score: 40},
        {name: 'Anna', score: 30},
        {name: 'Sam', score: 20},
        {name: 'Lora', score: 10},
    ];

    // Define only the unique icons for top 3
    const topIcons = ['🥇', '🥈', '🥉'];

    // Function to get icon based on index
    const getPositionIcon = (index: number) => topIcons[index] || '🎖️';

    // Function to get row styling based on index
    const getRowStyle = (index: number) => {
        switch (index) {
            case 0:
                return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-bold shadow-sm';
            case 1:
                return 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200';
            case 2:
                return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
            default:
                return 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
        }
    };

    useEffect(() => {
        const stored: Score[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const sorted = stored.sort((a: Score, b: Score) => b.score - a.score);
        // Combine stored scores with default scores to ensure at least 10 entries
        const combined = [...sorted, ...defaultScores].slice(0, 10);
        setScores(combined);
    }, [storageKey]);

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-md w-full max-w-xs">
            <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
            <ul className="space-y-1">
                {scores.map((entry, i) => (
                    <li key={i} className={`flex justify-between items-center p-2 rounded ${getRowStyle(i)}`}>
            <span>
              {getPositionIcon(i)} {entry.name}
            </span>
                        <span>{entry.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopList;