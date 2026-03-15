import clsx from "clsx";
import React from "react";
import { BaseButtonProps, Theme } from "../../constants";
import { useThemeContext } from "../../hooks";

interface ContainedButtonProps extends BaseButtonProps { }

const ContainedButton: React.FC<ContainedButtonProps> = (props: ContainedButtonProps) => {
  const { children, className, ...rest } = props;
  const { theme } = useThemeContext();

  return (
    <button
      className={clsx(
        "contained-btn-base",
        "drop-shadow-md",
        "font-semibold",
        "standard-border-radius",
        "bg-slate-500/10",
        "dark:bg-white/10",
        className,
        {
          "contained-btn--light": theme === Theme.Light,
          "contained-btn--dark": theme === Theme.Dark,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ContainedButton;