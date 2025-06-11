/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  export { ReactComponent };
}

declare type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

declare interface PropsWithClassName {
  className?: string;
}