const { resolve } = require("path")

const mod = "sum"

const method = require(resolve(__dirname, './' + mod + '.cjs'))

console.log(method(1, 2));

