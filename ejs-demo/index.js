// import { compile } from "vue"
// import { compile } from "@vue/compiler-dom"
import { compileTemplate as compile, compileScript, parse, compileStyle } from "@vue/compiler-sfc"
import fs from "node:fs/promises"
const tempalte = `
<template>
    <div class="container">
        <p>name: {{ user.name }}</p>
    </div>
</template>
<script setup>
const user = {
    name: "张三"
}
</script>
<style lang="less" scoped>
.container {
    width: 80%;
    margin: 0 auto;
    p {
        font-size: 16px;
    }
}
</style>
`
const { code, ast } = compile({
    source: tempalte,
    compilerOptions: {
        whitespace: "condense",
        ssr: false
    },
    id: "demo.vue"
})
fs.writeFile("./demo.js", code, "utf-8").then(() => {
    console.log("写入成功")
})
const { descriptor } = parse(tempalte)
const { content } = compileScript(descriptor, {
    id: "demo.vue",
})
console.log(content)

const { code: css } = compileStyle({
    source: tempalte,
    id: "demo.vue",
    scoped: true,
    module: false,
    preprocessLang: "less",
})
console.log("rawResult", css)