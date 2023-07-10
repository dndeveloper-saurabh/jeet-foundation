import React, {useState, createContext, useEffect} from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  //------------------------------------ constants hooks

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark')
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
