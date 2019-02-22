import * as React from "react";
import ReactDOM from "react-dom";
export const Login = (page: any) => (rootElement: HTMLElement) =>
  ReactDOM.render(React.createElement(page), rootElement);
