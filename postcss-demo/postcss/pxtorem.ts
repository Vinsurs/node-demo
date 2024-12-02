import type { PluginCreator } from "postcss"
export interface PluginOptions {
    rootValue?: number | ((id: string) => number)
}
const defaultOpts: Required<PluginOptions> = {
    rootValue: 16
}
function isPixelValue(value: string) {
    return value.match(/\d+px/i)
}
const pxtoremPlugin: PluginCreator<PluginOptions> = function pxtoremPlugin(opts?: PluginOptions) {
    const handled = Symbol("handled")
    return {
        postcssPlugin: "postcss-pxtorem",
        prepare(result) {
            console.log("prepare 执行了", result.opts.from, result.opts.to)
            let rootValue = defaultOpts.rootValue as number
            if (opts) {
                if (opts.rootValue) {
                    if (typeof opts.rootValue === "function") {
                        rootValue = opts.rootValue(result.opts.from) || defaultOpts.rootValue as number
                    } else if (opts.rootValue) {
                        rootValue = opts.rootValue
                    }
                }
            }
            return {
                Declaration(decl, helper) {
                    if (decl[handled]) return;
                    if (isPixelValue(decl.value)) {
                        decl.value = decl.value.replace(/(\d+)px/ig, function (_, $1) {
                            return $1 / rootValue + 'rem'
                        })
                    }
                    decl[handled] = true
                },
            }
        },
    }
}
pxtoremPlugin.postcss = true
export default pxtoremPlugin