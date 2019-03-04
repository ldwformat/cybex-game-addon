import * as React from "react";
import { IEffectDeps } from "../core/modes";
type ToolsetContext = {
  toolset: IEffectDeps | null;
};
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type withTooltipProps = {
  toolset: ToolsetContext;
};

export const ToolsetContext = React.createContext<ToolsetContext>({
  toolset: null
});

export const withToolset = Component => props => (
  <ToolsetContext.Consumer>
    {({ toolset }) => <Component {...props} toolset={toolset} />}
  </ToolsetContext.Consumer>
);
