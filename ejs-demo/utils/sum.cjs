module.exports = function sum(...args) {
    return args.reduce((a, b) => a + b, 0)
}