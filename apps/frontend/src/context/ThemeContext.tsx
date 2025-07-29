import { useEffect, useState } from "react";

import type { Theme } from "../interfaces/ThemeContext";
import { ThemeProviderContext } from ".";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const setNewTheme = (theme: Theme) => {
    console.log(theme);
    console.log(localStorage.getItem("theme"));

    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    console.log(newTheme);
    console.log(localStorage.getItem("theme"));

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme: setNewTheme,
        toggleTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
