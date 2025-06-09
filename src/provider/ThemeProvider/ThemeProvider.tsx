import { type FunctionComponent, type PropsWithChildren, createContext, useEffect, useState } from "react";
import { Theme, type ThemeValue, localStorageKeys } from "../../constants/app";

interface ThemeProps {
  handleToggleTheme: () => void;
  theme: ThemeValue;
}

const htmlElement = document.getElementsByTagName("html").item(0);
const changeHtmlTheme = (theme: ThemeValue) => {
  if (!htmlElement) return;

  if (htmlElement.classList.contains(Theme.Dark)) {
    htmlElement.classList.remove(Theme.Dark);
  } else if (htmlElement.classList.contains(Theme.Light)) {
    htmlElement.classList.remove(Theme.Light);
  }

  htmlElement.classList.add(theme);
};

let defaultTheme: string = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light;
try {
  const localStoreMode = localStorage.getItem(localStorageKeys.theme);
  if (localStoreMode !== null) {
    defaultTheme = localStoreMode as ThemeValue;
  }
} catch {}; // eslint-disable-line no-empty

export const ThemeContext = createContext<ThemeProps | undefined>(undefined);

const ThemeProvider: FunctionComponent<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;
  const [theme, setTheme] = useState<ThemeValue>(defaultTheme);

  const handleThemeChange = (theme: ThemeValue) => {
    setTheme(theme);
    localStorage.setItem(localStorageKeys.theme, theme);
    changeHtmlTheme(theme);
  };

  const handleToggleTheme = () => {
    handleThemeChange(theme === Theme.Light ? Theme.Dark : Theme.Light);
  }

  useEffect(() => {
    changeHtmlTheme(defaultTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ handleToggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;