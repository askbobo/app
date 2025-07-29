
import { useState } from 'react';
import questions from '../data/B-Quizzes.json';

interface Question {
  id: string;
  question: string;
  options: (string | number)[];
  correct: string | number;
}

interface SummaryEntry {
  question: string;
  yourAnswer: string | number;
  correctAnswer: string | number;
  isCorrect: boolean;
}

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [summary, setSummary] = useState<SummaryEntry[]>([]);
  const [finished, setFinished] = useState(false);

  const current = questions[step] as Question;

  const handleAnswer = (answer: string | number) => {
    if (selected !== null) return; // prevent multiple selections

    setSelected(answer);
    const isCorrect = answer === current.correct;
    if (isCorrect) setScore(score + 1);

    setSummary((prev) => [
      ...prev,
      {
        question: current.question,
        yourAnswer: answer,
        correctAnswer: current.correct,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    const next = step + 1;
    if (next < questions.length) {
      setStep(next);
      setSelected(null);
    } else {
      saveScore();
      setFinished(true);
    }
  };

  const saveScore = () => {
  const existing = JSON.parse(localStorage.getItem('quiz-scores') || '[]');
  const filtered = existing.filter((entry: any) => entry.name !== name);
  filtered.push({ name, score });
  localStorage.setItem('quiz-scores', JSON.stringify(filtered));
};


  const reset = () => {
    setScore(0);
    setStep(0);
    setName('');
    setSelected(null);
    setStarted(false);
    setSummary([]);
    setFinished(false);
  };

  if (!started) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Enter your name to begin the quiz:</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded border w-full dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={() => name && setStarted(true)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Quiz Summary</h2>
        <p className="mb-4">Final Score for {name}: {score} / {questions.length}</p>
        <ul className="space-y-2">
          {summary.map((entry, idx) => (
            <li key={idx} className="border rounded p-2 bg-gray-50 dark:bg-gray-700">
              <p className="font-semibold">{entry.question}</p>
              <p>Your Answer: <span className={entry.isCorrect ? 'text-green-600' : 'text-red-500'}>{entry.yourAnswer}</span></p>
              {!entry.isCorrect && (
                <p>Correct Answer: <span className="text-green-600">{entry.correctAnswer}</span></p>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">{current.question}</h2>
      <div className="grid gap-2">
        {current.options.map((opt, idx) => {
          let style = "bg-gray-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-blue-700";
          if (selected !== null) {
            if (opt === current.correct) style = "bg-green-500 text-white dark:bg-green-600";
            else if (opt === selected) style = "bg-red-500 text-white dark:bg-red-600";
            else style = "bg-gray-300 text-black dark:bg-gray-700 dark:text-white";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              disabled={selected !== null}
              className={`px-4 py-2 rounded ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <button
          onClick={nextQuestion}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next Question
        </button>
      )}
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Question {step + 1} of {questions.length}
      </p>
    </div>
  );
};

export default Quiz;
