import { sum, asyncFun } from "./utils/sum";
import { add } from "lodash-es";

const log = (msg: any) => {
    console.info(msg)
}
debugger;
log(sum(1, 2))
asyncFun().then(log).finally(() => {
    log("index.ts finished")
})
log(add(1, 2))