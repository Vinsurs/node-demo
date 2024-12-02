import { register, unregister } from "enquire.js"
import { warn } from './warn'

const query = "screen and (max-width: 768px)"
register(query, {
    match() {
        warn("match called")
    },
    unmatch() {
        warn("unmatch called")
    },
    setup() {
        warn("setup called, 母狗咆哮怒喷屎")
    },
    deferSetup: true,
    destroy() {
        warn("destroy called")
    }
})
window.addEventListener("beforeunload", function () {
    unregister(query)
})