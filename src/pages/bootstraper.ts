import ReactDOM from "react-dom";
import * as React from "react";
export const bootstrap = (page: any) => (rootElement: HTMLElement) =>
  ReactDOM.render(React.createElement(page), rootElement);
