const http = require("node:http")
const https = require("node:https")

const postData = JSON.stringify({
    mobile: "17679248591",
    type: 0
})
http.createServer(function (req, res) {
    const r = https.request({
        href: "https://cscompanyapi.91goodlife.com/sendvcode",
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
    }, function (s) {
        s.on("data", function () {
            console.log("是有数据")
        })
        s.on("error", function () {
            console.log("响应错误")
        })
    })
    r.on("error", function (err) {
        console.log("请求失败", err)
    })
    r.end(postData)
    // res.end("ok")
}).listen(3333, function () {
    console.log("server is running at http://localhost:3333")
})