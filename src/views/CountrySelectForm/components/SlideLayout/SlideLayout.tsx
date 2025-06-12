import clsx from "clsx";
import { FunctionComponent } from "react";
import { BaseDivProps } from "../../../../constants";

const SlideLayout: FunctionComponent<BaseDivProps> = (props: BaseDivProps) => {
  const { children, className } = props;
  return (
    <div
      className={clsx(
        "w-full",
        "h-full",
        "flex",
        "flex-col",
        "pt-[10rem]",
        "sm:pt-[12.5rem]",
        "px-4",
        "gap-4",
        "sm:gap-6",
        "bg-slate-300/60",
        "dark:bg-slate-900/80",
        "slide-transition",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SlideLayout;