import { defineConfig } from "rollup"
// import commonjs from "@rollup/plugin-commonjs"
// import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
export default defineConfig({
    input: "./postcss/pxtorem.ts",
    output: [
        {
            file: "./dist/postcss-pxtorem.mjs",
            format: "esm",
        },
        {
            file: "./dist/postcss-pxtorem.cjs",
            format: "cjs"
        }
    ],
    plugins: [
        typescript({
            compilerOptions: {
                declaration: true,
                declarationDir: "./dist"
            }
        }),
        // commonjs(),
        // resolve(),
    ]
})