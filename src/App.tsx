
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dictionary from './components/Dictionary';
import DarkModeToggle from './components/DarkModeToggle';
import Quiz from './components/Quiz';
import HighScores from './components/HighScores';
import LastName from './components/LastName';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 shadow">
          <div className="flex gap-4">
            <Link to="/" className="font-bold hover:underline">Dictionary</Link>
            <Link to="/quiz" className="font-bold hover:underline">Quiz</Link>
<Link to="/last-name" className="font-bold hover:underline">Last Names</Link>
          </div>
          <DarkModeToggle />
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-grow">
              <Routes>
<Route path="/last-name" element={<LastName />} />
                <Route path="/" element={<Dictionary />} />
                <Route path="/quiz" element={<Quiz />} />
              </Routes>
            </div>
            <div className="w-full lg:w-80">
              <HighScores />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
