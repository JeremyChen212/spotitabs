import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from './Themes';
import { ThemeType } from '@component/types/types';
interface ContextProps {
    currentTheme: string,
    toggleTheme: () => void
}


export const ThemeContext = createContext({} as ContextProps);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{  currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
