import postcss from "postcss";
import postcssEnv from "postcss-preset-env";
import { readFileSync, writeFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const css = readFileSync("./test.css", "utf-8")
const to = resolve(__dirname, "./test.out.css")

postcss([postcssEnv({
    browsers: "last 2 versions"
})]).process(css, {
    from: "./test.css",
    to
}).then(result => {
    writeFileSync(to, result.css, "utf-8")
})
