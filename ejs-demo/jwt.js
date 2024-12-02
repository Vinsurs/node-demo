import { createSign, generateKeyPairSync, createVerify } from "node:crypto"

const header = {
    alg: "HS256",
    typ: "JWT"
}
const headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64')
const payload = {
    kind: 'female dog',
    name: 'linDog'
}
const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64')

const { privateKey } = generateKeyPairSync("ec", { namedCurve: "sect239k1" })
const sign = createSign('SHA256')
sign.write(headerBase64 + '.' + payloadBase64, "base64")
sign.end()
const signature = sign.sign(privateKey, "base64")
const jwt = headerBase64 + '.' + payloadBase64 + '.' + signature
console.log(jwt)
const verify = createVerify('SHA256')
verify.write(headerBase64 + '.' + payloadBase64, "base64")
verify.end()
const flag = verify.verify(privateKey, signature, "base64")
console.log(flag)
