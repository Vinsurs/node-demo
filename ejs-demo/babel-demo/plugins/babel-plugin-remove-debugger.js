/**
 * @param {{ types: import("@babel/types") }} babel
 * @returns {import("@babel/core").PluginObj}
 */
export default function RemoveDebugger({ types: t }) {
    return {
        name: "babel-plugin-remove-debugger",
        visitor: {
            DebuggerStatement(path) {
                path.remove();
            },
        },
    }
}
