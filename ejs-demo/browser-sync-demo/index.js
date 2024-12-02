import ejs from "ejs"
import { parse } from 'marked'
import { watchFile, readFileSync, writeFileSync } from "node:fs"
import browserSync from "browser-sync"

let browser;
function createBrowser() {
    browser = browserSync.create()
    browser.init({
        server: "./",
        port: 3030,
        files: ["./index.html"],
    })
}
async function setup(cb) {
    const content = readFileSync("./README.md", "utf8")
    const html = await ejs.renderFile("./template.ejs", {
        title: "母狗记",
        content: parse(content),
    })
    writeFileSync("index.html", html, "utf8")
    cb && cb()
}
watchFile("./README.md", () => {
    setup(() => {
      browser ? browser.reload() : createBrowser()
    })
})
setup(() => {
    createBrowser()
})