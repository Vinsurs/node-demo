function throwable() {
    const random = Math.random()
    console.info("random", random)
    if (random > 0.5) {
        throw new Error("手动报错")
    } else if (random > 0.3) {
        return Promise.reject("rejected Promise")
    }
    return "ok"
}
process.on("uncaughtException", function (err) {
    console.log("uncaughtException", err)
})
process.on("unhandledRejection", function (err) {
    console.log("unhandledRejection", err)
})
process.on("exit", function (err) {
    console.log("程序退出了", err)
})
throwable()