const mod = "./mul.js"

import(mod).then(method => {
    console.log(method.default(1, 2))
})