export type ThemeType = {
  Dark: string;
  Light: string;
};

export const Theme: ThemeType = {
  Dark: "dark",
  Light: "light",
};

export const fallbackTheme = Theme.Light;

export type ThemeValue = typeof Theme[keyof typeof Theme];

export const localStorageKeys: { [key: string]: string } = {
  theme: "@app/SET_THEME",
  searchHistory: "@country/SET_SEARCH_HISTORY",
  searchHistoryData: "@country/SET_SEARCH_HISTORY_DATA",
  searchHistoryOrder: "@country/SET_SEARCH_HISTORY_ORDER",
};

export const setLocalStorage = <T extends unknown>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};