/**
 * @param {{ types: import("@babel/types") }} babel
 * @returns {import("@babel/core").PluginObj}
 */
export default function Micro({ types: t }) {
    return {
        name: "babel-plugin-micro",
        pre() {
            console.info("is match pre", this.filename)
            this.set("matched", !!this.filename.match(/\.config\.ts/))
        },
        visitor: {
            ExportDefaultDeclaration(path) {
                if (t.isCallExpression(path.node.declaration) && t.isIdentifier(path.node.declaration.callee, { name: "definePageConfig" })) {
                    path.get("declaration").replaceWith(
                        path.node.declaration.arguments[0]
                    )
                }
            }
        },
        post() {
            console.info("is match post", this.get("matched"))
        }
    }
}