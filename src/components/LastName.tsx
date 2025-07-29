import {useState} from 'react';
import lastNamesData from '../data/B-LastNames.json';

interface LastNameEntry {
    latin: string;
    desc: string;
}

const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));

export default function LastName() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('');

    const filteredNames = lastNamesData.filter((entry: LastNameEntry) => {
        const name = entry.latin.toLowerCase();
        if (selectedLetter) {
            return name.startsWith(selectedLetter.toLowerCase());
        }
        return searchTerm ? name.includes(searchTerm.toLowerCase()) : false;
    });

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Last Name Meaning</h1>

            <div className="flex flex-wrap gap-2">
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        className={`px-3 py-1 border rounded transition ${
                            selectedLetter === letter
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
                        }`}
                        onClick={() => {
                            setSelectedLetter(letter);
                            setSearchTerm('');
                        }}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            <input type="text"
                   placeholder="Search a last name"
                   value={searchTerm}
                   onChange={(e) => {
                       setSearchTerm(e.target.value);
                       setSelectedLetter('');
                   }}
                   className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            <ul className="mt-4 space-y-2">
                {filteredNames.map((entry, index) => (
                    <li key={index} className="p-3 border rounded bg-white dark:bg-gray-800 dark:text-white">
                        <strong>{entry.latin}</strong>: {entry.desc}
                    </li>
                ))}
            </ul>
        </div>
    );
}