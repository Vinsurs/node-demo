import ejs from "ejs"
import fs from "node:fs"

const ejsTemplate = `
    <% if (user.age>=18) { %>
        <p>name:<%= user.name %></p>
        <p>age:<%= user.age %></p>
    <% } else { %>
        <p>对不起，到你18岁那年再来访问吧</p>
    <% } -%>
    <%= \`
    这里是新行\` %>
    <%- include("/footer.ejs", {
        footerText: "这里是页脚!!"
    }) %>
    <%- include("/footer.ejs", {
        footerText: "这里是第二个页脚!!"
    }) %>
`
const temp = new ejs.Template(ejsTemplate, {
    root: "./views/"
})
const render = temp.compile()
const html = render({
    user: {
        name: "张三",
        age: 17
    },
})
fs.writeFileSync("./test.html", html, "utf-8")

const render2 = ejs.compile(ejsTemplate, {
    root: "./views/"
})
const html2 = render2({
    user: {
        name: "李四",
        age: 18
    }
})
console.log(html2)

const xml = ejs.escapeXML(`
    <user>
        <name>王五</name>
        <age>17</age>
    </user>
`)
console.log(xml)
const html3 = ejs.render(ejsTemplate, {
    user: {
        name: "老王",
        age: 18
    }
}, {
    root: "./views/"
})
console.log(html3)
ejs.renderFile("./views/footer.ejs", {
    footerText: "这里是页脚内容!!!!"
}).then(console.log)

const includePath = ejs.resolveInclude("../a.ejs", "./views/head.ejs", false)
console.info(includePath)