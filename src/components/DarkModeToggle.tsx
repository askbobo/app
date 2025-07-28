import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle = () => {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="ml-auto p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;
