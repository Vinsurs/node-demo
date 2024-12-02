import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.get('/', (req, res) => {
    console.log("request ip", req.ips, req.ip, req.headers)
    res.send({ message: 'ok' })
})
app.get('/get-ip', (req, res) => {
    console.log("request ip", req.ips, req.ip, req.headers)
    res.send({ message: "ok" })
})
app.listen(8888, function () {
    console.log('server is running at http://192.168.18.8:8888');
})