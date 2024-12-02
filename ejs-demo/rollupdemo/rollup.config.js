// @ts-check
import { defineConfig } from "rollup"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"
import html from "@rollup/plugin-html"
// import run from "@rollup/plugin-run"
import { basename } from "node:path"

export default defineConfig(cmdArgs => {
    console.info("defineConfig:", cmdArgs, process.env.MUGOU, process.env.FUCK_MUGOU, process.env.ROLLUP_WATCH)
    return {
        input: ["src/index.js"],
        output: {
            dir: "dist",
            format: "es",
            entryFileNames: "[name].js",
            chunkFileNames: "[name].[hash:8].js",
            sourcemap: "inline",
            manualChunks(id) {
                if (id.includes("node_modules")) {
                    return "vendor"
                } else if (id.includes("src")) {
                    return basename(id).split(".")[0]
                }
            }
        },
        plugins: [
            resolve(),
            commonjs(),
            json(),
            html(),
            process.env.FUCK_MUGOU ? terser() : null,
        ]
    }
})