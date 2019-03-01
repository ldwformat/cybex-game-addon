import { resolvePath } from "./path";
export const getReferUrl = (path: string, accountName: string) =>
  `${path}?refer=${accountName}`;
export const resolveNameFromReferUrl = (path: string) =>
  (path.match(/\?refer\=(.+)(?:$|\&)/i) || [])[1];
