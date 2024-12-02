module.exports = function mul(...args) {
    return args.reduce((a, b) => a * b, 1);
}