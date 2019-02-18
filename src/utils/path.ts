export const resolvePath = (...paths: string[]) =>
  paths.map(path => path.replace(/\/$/, "")).join("/");
