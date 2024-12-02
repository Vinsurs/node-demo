import { promisify } from "node:util"
import { normalize, sep } from "node:path"
console.info("构建百度小程序")

const target = "./build/*"
console.info(normalize(target), sep)

const fs = {
    stat(path, callback) {
        const throwError = Math.random() > 0.5;
        let err = null;
        if (throwError) {
            err = new Error("母狗死啦太好啦")
            callback(err)
            return
        }
        callback(err, path)
    }
}

const stat = promisify(fs.stat)
stat("/fuck/female/dog").then(value => {
    console.info("value:", value)
}).catch(err => {
    console.info("reason", err)
}).finally(() => {
    console.info("母狗你怎么还不去死哦")
})