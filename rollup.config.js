import terser from "@rollup/plugin-terser";

const prod = !process.env.NODE_ENV === "development";
console.log('dev', prod);


export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "es",
      name: "hooks-crafter",
      sourcemap: prod,
      Plugins: [terser({
        ecma: 2020,
        mangle: { toplevel: true },
        compress: {
          module: true,
          toplevel: true,
          drop_console: prod,
          drop_debugger: prod,
        },
        output: { quote_style: 1, }
      })]
    }

  }
]