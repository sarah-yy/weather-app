export const capitalize = (str: string): string => {
  if (str.length <= 1) return str.toUpperCase();
  return `${str[0].toUpperCase()}${str.substring(1)}`;
};

export const forceDoubleDigits = (newNum: number) => {
  return newNum < 10 ? `0${newNum}` : newNum;
};