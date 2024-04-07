import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "server/app.ts",
    output: {
      file: "build/app.js",
      format: "es",
    },
    plugins: [typescript()],
  },
];