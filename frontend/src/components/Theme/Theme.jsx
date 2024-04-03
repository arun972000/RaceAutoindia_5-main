/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const ThemeDataContext = createContext();

const ThemeDataProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme")=="true");



  return (
    <ThemeDataContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeDataContext.Provider>
  );
};

export { ThemeDataProvider, ThemeDataContext };
