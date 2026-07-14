import { createContext, useState, useEffect } from 'react'
const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
      const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
      return savedDarkMode ?? false;
    });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  }
  return (
      <ThemeContext.Provider value={{ darkMode,toggleDarkMode }}>
          {children}
      </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
