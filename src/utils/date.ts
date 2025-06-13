const dayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getDayOfWeek = (date?: Date) => {
  const day = date?.getDay() ?? 0;
  return dayNames[day];
};