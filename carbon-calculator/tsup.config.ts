import { defineConfig } from "tsup";
// import tsconfig from "./tsconfig.json";

export default defineConfig((options) => ({
  entry: [
    "src/index.ts",
    "src/carbon-calculator.ts",
    "src/air-calculator.ts",
    "array-functions.ts",
    "carbon-calculator-css.ts",
    "car-calculator.ts",
    "CartItem.ts",
    "city-dialog.ts",
    "city-list.ts",
    "home-calculator.ts",
    "quick-calculator.ts",
  ],
  dts: true,
  outDir: "dist",
  format: ["esm"],
  name: "carbon-calculator",
  splitting: false,
  // outExtension({ format }) {
  //   return {
  //     js: `.${format}.js`,
  //   };
  // },
  sourcemap: false,
  clean: true,
  // target: tsconfig.compilerOptions.target as "es2016",
  target: ["es2020"],
  // target: "es2020" as "es2016",
  minify: false,
  // minify: !options.watch == Conditional config ==
}));
