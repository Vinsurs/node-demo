module.exports = {
    plugins: {
        "postcss-pxtorem": {
            rootValue(id) {
                console.log("id =>", id)
            }
        }
    }
}