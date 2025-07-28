import {DictionaryEntry} from '../types';

const WordCard = ({entry}: { entry: DictionaryEntry }) => (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold">{entry.English}</h2>

        <p><strong>Latin:</strong> {entry.Latin}</p>
        <p><strong>Bukharian:</strong> {entry.Bukharian}</p>
        <hr/>
        <p><strong>Russian:</strong> {entry.Russian}</p>
        <p className="italic text-sm">({entry.Type})</p>
    </div>
);
export default WordCard;
