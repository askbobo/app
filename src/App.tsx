import {useState} from 'react';
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Dictionary from './components/Dictionary';
import DarkModeToggle from './components/DarkModeToggle';
import Quiz from './components/Quiz';
import LastName from './components/LastName';
import Flashcards from './components/Flashcards';
import About from './components/About';
import BigHeader from './components/BigHeader';
import TopList from './components/TopList';
import logo from './assets/logos/icon-logo.png'; // Adjust path to match BigHeader's import

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                {/* Navigation Bar */}
                <nav
                    className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 shadow relative z-20">
                    <div className="flex items-center">
                        <button className="lg:hidden w-16 h-16" onClick={toggleMenu}>
                            <img src={logo} alt="Logo" className="w-16 h-16 object-contain"/>
                        </button>
                        <div className="lg:hidden ml-3 text-2xl font-bold">Ask Bobo</div>

                        <div className="hidden lg:flex gap-4 ml-4">
                            <Link to="/" className="font-bold hover:underline">Last Names</Link>
                            <Link to="/dictionary" className="font-bold hover:underline">Dictionary</Link>
                            <Link to="/quiz" className="font-bold hover:underline">Quiz</Link>
                            <Link to="/flashcards" className="font-bold hover:underline">Flashcards</Link>
                            <Link to="/about" className="font-bold hover:underline">About</Link>
                        </div>
                    </div>
                    <DarkModeToggle/>
                </nav>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-gray-800 px-4 py-2 shadow absolute top-[4.5rem] left-0 right-0 z-10">
                        <div className="flex flex-col gap-2 pt-1 text-xl">
                            <Link to="/" className="font-bold hover:underline" onClick={toggleMenu}>Last Names</Link>
                            <Link to="/dictionary" className="font-bold hover:underline" onClick={toggleMenu}>Dictionary</Link>
                            <Link to="/quiz" className="font-bold hover:underline" onClick={toggleMenu}>Quiz</Link>
                            <Link to="/flashcards" className="font-bold hover:underline" onClick={toggleMenu}>Flashcards</Link>
                            <Link to="/about" className="font-bold hover:underline" onClick={toggleMenu}>About</Link>
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <div className="p-4">
                    <BigHeader/>
                    <br/>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-grow">
                            <Routes>
                                <Route path="/" element={<LastName/>}/>
                                <Route path="/dictionary" element={<Dictionary/>}/>
                                <Route path="/quiz" element={<Quiz/>}/>
                                <Route path="/flashcards" element={<Flashcards/>}/>
                                <Route path="/about" element={<About/>}/>
                            </Routes>
                        </div>
                        <div className="w-full lg:w-80 flex justify-center lg:justify-start">
                            <div>
                                <TopList storageKey="quiz-scores" title="🏆 Quiz High Scores"/>
                                <TopList storageKey="flashcard-scores" title="🧠 Flashcard High Scores"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
