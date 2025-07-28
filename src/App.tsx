import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Dictionary from './components/Dictionary';
import DarkModeToggle from './components/DarkModeToggle';
import Quiz from './components/Quiz';
import HighScores from './components/HighScores';
import LastName from './components/LastName';
import Flashcards from './components/Flashcards';
import About from "./components/About";
import FlashHighScores from "./components/FlashHighScores";


function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                {/* Navigation Bar */}
                <nav className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 shadow">
                    <div className="flex gap-4">
                        <Link to="/last-name" className="font-bold hover:underline">Last Names</Link>
                        <Link to="/" className="font-bold hover:underline">Dictionary</Link>
                        <Link to="/quiz" className="font-bold hover:underline">Quiz</Link>
                        <Link to="/flashcards" className="font-bold hover:underline">Flashcards</Link>
                        <Link to="/about" className="font-bold hover:underline">About</Link>
                    </div>
                    <DarkModeToggle/>
                </nav>

                {/* Page Content */}
                <div className="p-4">
                    <div className="banner">
                        <h1 className="text-5xl font-bold">AskBobo</h1>
                        <h1 className="text-1xl font-bold text-blue-400">The one and only Bukharian online dictionary.</h1>
                    </div>
                    <br/>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-grow">
                            <Routes>
                                <Route path="/last-name" element={<LastName/>}/>
                                <Route path="/" element={<Dictionary/>}/>
                                <Route path="/quiz" element={<Quiz/>}/>
                                <Route path="/flashcards" element={<Flashcards/>}/>
                                <Route path="/about" element={<About/>}/>

                            </Routes>
                        </div>
                        <div className="w-full lg:w-80">
                            <HighScores/>
                            <FlashHighScores/>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
