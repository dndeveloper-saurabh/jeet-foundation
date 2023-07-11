import React, {useState, createContext, useEffect} from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  //------------------------------------ constants hooks

  const [isDark, setIsDark] = useState(() => window.localStorage.getItem('dark') === 'true');

  useEffect(() => {
    isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark')
    isDark ? window.localStorage.setItem('dark', 'true') : window.localStorage.setItem('dark', 'false');
  }, [isDark])

  return (
    <ThemeContext.Provider
      value={{
        isDark: [isDark, setIsDark]
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
