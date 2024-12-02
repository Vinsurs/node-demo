import { createSSRApp, defineComponent, ref } from "vue"
import { renderToString } from "@vue/server-renderer"

const App = defineComponent({
    name: "App",
    template: `<div>{{appName}} Hello {{user.name}}</div>`,
    setup() {
        const user = ref({
            name: "李四",
            age: 18
        })
        return {
            user
        }
    }
})
const app = createSSRApp(App, {
    appName: "vue3",
    class: "app"
})
const html = await renderToString(app)
console.log(html);
