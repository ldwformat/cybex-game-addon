/* tslint:disable */
console.log("Hello Cybex");

// For some crypto lib
import * as process from "process";
declare const require;
if (typeof window !== undefined) {
  window["global"] = window;
  const Buffer = require("buffer/").Buffer;
  window["process"] = process;
  window["Buffer"] = Buffer;
}
export * from "./core/index";
export * from "./pages/index";
export * from "./utils/index";
