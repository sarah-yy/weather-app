import clsx from "clsx";
import { FunctionComponent } from "react";
import { BaseDivProps } from "../../../../../constants";
import { Card } from "../../../../../components";

const WeatherCard: FunctionComponent<BaseDivProps> = (props: BaseDivProps) => {
  const { children, className } = props;
  return (
    <Card
      className={clsx("dark:bg-slate-800/40!", "bg-slate-100/60!", className)}
    >
      {children}
    </Card>
  );
};

export default WeatherCard;