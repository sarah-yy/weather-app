import clsx from "clsx";
import { createElement } from "react";
import { BaseDivProps } from "../../constants";

interface Props extends BaseDivProps {
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
}

const ThemedText: React.FC<Props> = (props: Props) => {
  const { children, className, component = "p" } = props;
  return createElement(
    component,
    { className: clsx("text-slate-800 dark:text-white", className) },
    children,
  );
};

export default ThemedText;