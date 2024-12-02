import { bundleRequire } from "bundle-require"
import { resolve } from "path"
import { fileURLToPath } from "node:url"

const __dirname = resolve(fileURLToPath(import.meta.url), "..")

const specifier = "sum"

const { mod } = await bundleRequire({
    filepath: resolve(__dirname, './' + specifier + '.cjs')
})
console.log("method", mod(1, 2))