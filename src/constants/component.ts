import { PropsWithChildren } from "react";

export type BaseDivProps = PropsWithChildren & PropsWithClassName;

export type BaseButtonProps = React.ButtonHTMLAttributes<any> & React.PropsWithChildren & PropsWithClassName;

export type PathColorType = {
  Fill: string;
  Stroke: string;
};

export const PathColor: PathColorType = {
  Fill: "fill",
  Stroke: "stroke",
};

export interface FillTypeProps {
  fillType?: typeof PathColor[keyof typeof PathColor];
}