import {useState} from 'react';
import data from '../data/B-Dic.json';
import {DictionaryEntry} from '../types';
import WordCard from './WordCard';


const Dictionary = () => {
    const [query, setQuery] = useState('');
    const entries = data as DictionaryEntry[];

    const filtered = query
        ? entries.filter((entry) =>
            Object.values(entry).some(
                (value) =>
                    typeof value === 'string' &&
                    value.toLowerCase().startsWith(query.toLowerCase())
            )
        )
        : [];

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Dictionary</h1>

            <input type="text"
                   placeholder="Start typing a word..."
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   className="w-full p-2 mb-4 rounded border dark:bg-gray-700 dark:text-white"
            />

            {filtered.length > 0 ? (
                <div className="grid gap-4">
                    {filtered.map((entry, idx) => (
                        <WordCard key={idx} entry={entry}/>
                    ))}
                </div>
            ) : query ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No matches found.</p>
            ) : null}
        </div>
    );

};

export default Dictionary;
