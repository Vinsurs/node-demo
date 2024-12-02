import { defineConfig } from "rollup"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import replace from "@rollup/plugin-replace"
import typescript from "@rollup/plugin-typescript"
import html from "@rollup/plugin-html"

export default defineConfig({
    input: './index.ts',
    output: {
        dir: "dist",
        format: "esm",
    },
    plugins: [
        commonjs(),
        nodeResolve(),
        replace({
            values: {
                "process.env.NODE_ENV": JSON.stringify("production")
            },
            preventAssignment: true
        }),
        typescript(),
        html({
            publicPath: "./",
            title: "林母狗不得好死你妈的狗杂种"
        })
    ],
    watch: {}
})