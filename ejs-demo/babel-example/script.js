import webpack from "webpack"
import { promisify } from "node:util"
import config from "./webpack.config.cjs"

const compiler = webpack(config)
const run = promisify(compiler.run.bind(compiler))
run().then(stat => {
    console.info(stat.toString({
        colors: true
    }))
})