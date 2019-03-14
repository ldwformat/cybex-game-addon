import { resolvePath } from "./path";
const RefReg = /\$\|refer\|/;

export const getReferUrl = (path: string, accountName: string) =>
  path.search(RefReg) !== -1
    ? path.replace(RefReg, `refer=${accountName}`)
    : `${path}?refer=${accountName}`;

export const resolveNameFromReferUrl = (path: string) =>
  (path.match(/\?refer\=(.+?)(?:$|\&|\#|\/)/i) || [])[1];
