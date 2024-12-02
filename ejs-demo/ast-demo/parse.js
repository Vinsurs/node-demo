import * as acorn from "acorn"
import * as wark from "acorn-walk"
import * as recast from "recast"
import { readFileSync, writeFileSync } from "node:fs"
import assert from "node:assert"

const source = readFileSync("./test.js", "utf-8")

// const ast = acorn.parse(source, {
//     ecmaVersion: "latest",
//     sourceType: "module",
// })

// wark.simple(ast, {
//     FunctionDeclaration(node) {
//        node.id.name = "rename"
//     },
// })

const ast = recast.parse(source, {
    parser: acorn
})

const program = ast.program

const body = program.body[0]

body.id.name = "rename"

const importDeclaration = recast.types.builders.importDeclaration([
    recast.types.builders.importDefaultSpecifier(recast.types.builders.identifier("jquery"))
], recast.types.builders.literal("jquery"))

program.body.unshift(importDeclaration)

recast.types.visit(ast, {
    // 移除所有debugger;语句
    visitDebuggerStatement(path) {
        path.parentPath.value.shift()
        // 继续遍历子树
        this.traverse(path)
        // 中断遍历
        // this.abort()
        // 不再继续往下遍历子树
        // return false
    },
    // 移除所以console语句
    visitCallExpression(path) {
        if (path.value.callee.type === "MemberExpression" && path.value.callee.object.type === "Identifier" && path.value.callee.object.name === "console") {
            // path.parentPath.value.shift()
            path.prune()
        }
        this.traverse(path)
    }
})

writeFileSync("./test.out.js", recast.print(ast).code, "utf-8")