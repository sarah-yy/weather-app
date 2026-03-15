import { useContext } from "react";
import { ThemeContext } from "../provider";

export default () => {
  const ctxValue = useContext(ThemeContext);
  if (ctxValue === undefined) {
    throw new Error("Expected an Context Provider somewhere in the react tree to set context value");
  };
  return ctxValue;
};