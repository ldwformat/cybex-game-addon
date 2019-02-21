export const resolvePath = (...paths: string[]) =>
  paths
    .slice(0, -1)
    .map(path => path.replace(/\/$/, ""))
    .concat(paths.slice(-1))
    .join("/");
