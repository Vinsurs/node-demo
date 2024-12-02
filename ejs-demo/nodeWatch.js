import { watch } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const watcher = watch(__filename)
for await (const changeInfo of watcher) {
    console.info("文件发生了改变:", changeInfo)
}