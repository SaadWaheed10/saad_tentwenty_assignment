// Ambient module declarations so `require('./foo.png')` / `import x from
// './foo.png'` type-check. Metro handles the actual bundling; TypeScript
// just needs to know these imports resolve to a number (asset id).
declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.jpg' {
  const value: number;
  export default value;
}

declare module '*.jpeg' {
  const value: number;
  export default value;
}

declare module '*.svg' {
  const value: number;
  export default value;
}
