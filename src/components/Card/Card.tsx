import clsx from "clsx";
import React from "react";
import { BaseDivProps } from "../../constants";
import { useThemeContext } from "../../hooks";

interface Props extends BaseDivProps { }

const Card: React.FC<Props> = (props: Props) => {
  const { className, children, ...rest } = props;
  const { theme } = useThemeContext();

  return (
    <div className={clsx("card-base", "drop-shadow-md", `card-${theme}`, className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;