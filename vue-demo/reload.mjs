import BrowserSync from "browser-sync"
import { rollup } from "rollup"
import rollupConfig from "./rollup.config.js"

/** @type { import("browser-sync").BrowserSyncInstance } */
let instance
const name = "browser-sync"

function setupBrowserSync() {
    if (!instance) {
        instance = BrowserSync.create(name)
        instance.init({
            server: "./dist",
            cors: true,
        })
        instance.watch("./**/*.ts", {
            ignored: /node_modules/,
        }).on("change", async function (file) {
            console.log(`changed: ${file}`)
            console.log("rebuilding...")
            await build()
            console.log("rebuilt!")
            instance.reload()
        })
    } else {
        instance.reload()
    }
}
async function build() {
    const { write } = await rollup(rollupConfig)
    await write(rollupConfig.output)
}
async function setup() {
    await build()
    setupBrowserSync()
}
setup()