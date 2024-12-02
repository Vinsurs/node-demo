// "use strict";

// 1. 严格模式不允许使用未声明的变量
// message = "hello"
// console.log(message)
// 2. 严格模式不允许对只读属性进行赋值
// const fn = function () {}
// fn.name = "fuck"
// console.log(fn.name)
// 3. 严格模式不允许删除变量或函数
// let variable = "hello"
// function fun () {}
// const delVarRet = delete variable;
// const delFunRet = delete fun;
// console.log(variable, fun, delVarRet, delFunRet)
// 4. 严格模式不允许使用重名的参数
// function sum(count, count = 20) {
//     return count;
// }
// console.log(sum(10))
// 5. 严格模式不允许使用八进制字面量
// const octValue = 0123;
// console.log(octValue);
// 6. 严格模式不允许使用with
// const user = {
//     name: "jack",
//     age: 18
// }
// with(user) {
//     console.log(name, age);
// }
// 7. 严格模式eval的变量或函数对象不向外暴露
// eval("var message = 'hello world';")
// console.info(message)
// 8. 严格模式不允许this指向全局对象
// function getGlobal() {
//     return this;
// }
// console.info(getGlobal())
import getGlobal from "./strict_mod.js";
eval("var message = 'hello world';console.log('张二麻子');")
console.log("message: ", typeof message)
const sum = function() {
    const static = "protected"
    console.log("sum arguments: ", static)
}
console.info("global: ", getGlobal(), sum(1, 2))