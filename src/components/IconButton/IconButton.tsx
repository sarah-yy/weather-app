import clsx from "clsx";
import React from "react";
import { BaseButtonProps, FillTypeProps, PathColor, Theme } from "../../constants";
import { useThemeContext } from "../../hooks";

type PropsType = BaseButtonProps & FillTypeProps;

interface Props extends PropsType {
  fillType?: typeof PathColor[keyof typeof PathColor];
}

const IconButton: React.FC<Props> = (props: Props) => {
  const { className, children, fillType = "fill", ...rest } = props;
  const { theme } = useThemeContext();

  return (
    <button
      className={clsx(
        `icon-button--${theme}`,
        fillType,
        "icon-button-base",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;