// theme.js

  
export const colors = {
  dark: {
    '--primary': '#A4FDD3',
    '--secondary': '#3D3D3D',
    '--text': "#E4E4E4",
    '--accent': "#A5A4A4",
    '--bg1': '#161414',
    '--bg2': '#1F1C1C',
    '--bg3': '#302C2C'
  },
  light: {
    '--primary': '#A4FDD3',
    '--secondary': '#3D3D3D',
    '--text': "#E4E4E4",
    '--accent': "#A5A4A4",
    '--bg1': '#161414',
    '--bg2': '#1F1C1C',
    '--bg3': '#302C2C'
  }
};


const themes = Object.keys(colors);
const fallback = themes[0];

const getTheme = () => {
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme');
    if (theme) {
      return theme;
    }
  }
  return fallback;
};

const saveTheme = (theme = fallback) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
};
const setColorScheme = (theme = fallback) => {
  if (typeof window !== 'undefined') {
  Object.entries(colors[theme]).map(([color, value]) => {
    document.documentElement.style.setProperty(color, value);
  });
console.log(colors[theme])

} 
};
const setTheme = (() => {
  // it will load the last saved theme from the local storage
  // or fallback to the first available one
  // and then set it
  // happens on page load once
  setColorScheme(getTheme());

  return (theme) => {
    theme = colors[theme] ? theme : fallback;
    if (getTheme() !== theme) {
      setColorScheme(theme);
      saveTheme(theme);
    }
    console.log(theme)
    return theme;
  };
})();

export { themes, getTheme, setTheme };