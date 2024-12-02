// import { createApp, defineComponent, h, ref } from './vue/reactivity'

// const App = defineComponent({
//     name: "App",
//     setup() {
//         const count = ref(0)
//         function increment() {
//             count.value += 1
//         }
//         const btn = h("button", {
//             onClick: increment,
//         }, count)
//         return function render() {
//             return h("div", {
//                 id: "container"
//             }, h("div", ["林母狗不得好死", btn]))
//         }
//     }
// })
// const app = createApp(App)
// const el = document.createElement("div")
// el.id = "app"
// document.body.appendChild(el)
// app.mount(el)
import { computed, reactive, ref, toRef, watch, watchEffect } from './vue/reactivity'
// import { computed, reactive, ref, toRef, watch, watchEffect } from 'vue'

const div = document.createElement("div")
const btn = document.createElement("button")
const span = document.createElement("span")
btn.innerText = "按钮"
div.append(span, btn)
document.body.append(div)

const count = ref(0)

btn.addEventListener("click", function () {
    if (count.value < 1) {
        console.log("count 自增")
        count.value += 1
    } else {
        console.log("count 自赋")
        count.value = count.value
    }
}, false)
const watchHandle = watchEffect(function () {
    span.innerText = `count: ${count.value}`
})

const pauseBtn = document.createElement("button")
pauseBtn.innerText = "暂停"
pauseBtn.addEventListener("click", function () {
    console.log("暂停")
    watchHandle.pause()
}, false)

const resumeBtn = document.createElement("button")
resumeBtn.innerText = "恢复"
resumeBtn.addEventListener("click", function () {
    console.log("恢复")
    watchHandle.resume()
}, false)

const stopBtn = document.createElement("button")
stopBtn.innerText = "停止"
stopBtn.addEventListener("click", function () {
    console.log("停止")
    watchHandle.stop()
}, false)

div.append(pauseBtn, resumeBtn, stopBtn)

const user = reactive({
    name: 'Ally',
    age: 18
})
const span1 = document.createElement("span")
div.append(span1)
watchEffect(() => {
    span1.innerText = `${user.name}: ${user.age}`
})
const ageBtn = document.createElement("button")
ageBtn.textContent = "age++"
ageBtn.addEventListener("click", function () {
    user.age++;
    console.log("double.value", double.value)
}, false)
watch(() => user.age, function (n, o) {
    console.log("新值 %d, 旧值 %d", n, o)
})
div.append(ageBtn)
const stopWatch = watch(count, function (n, o) {
    console.log("watch 触发了, 新值: %s, 旧值: %s", n, o)
}, {
    immediate: true,
    once: false
})
const stopWatchBtn = document.createElement("button")
stopWatchBtn.textContent = "停止watch"
stopWatchBtn.addEventListener("click", stopWatch, false)
div.append(stopWatchBtn)
const toRefObj = toRef(count)
console.log("toRefObj", toRefObj)
const a = ref(1)
const b = ref(9)
const double = computed(() => {
    console.log("computed")
    return a.value + b.value
})
const p = document.createElement("p")
div.insertAdjacentElement("beforeend", p)
watchEffect(() => {
    console.log("watchEffect triggerred")
    p.textContent = `double: ${double.value}`
})
p.addEventListener("click", function () {
    a.value += 1
    b.value = 10 - a.value
}, false)