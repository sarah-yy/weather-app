import { useThemeContext } from "./hooks";

function App() {
  const { handleToggleTheme } = useThemeContext();

  return (
    <>
      <h1 className="text-sky-500 dark:text-sky-200 text-center font-semibold">
        This is a beginning React project
      </h1>
      <button onClick={handleToggleTheme}>
        Change Theme
      </button>
    </>
  );
}

export default App;