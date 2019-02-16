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
