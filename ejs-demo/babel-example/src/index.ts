import { fuckFemaleDog } from "./utils/fuck-femaledog"
import "./utils/female-dog"
class FemaleDog {
    constructor(private name: string) {
    }
    print() {
        console.log("I am a female dog named " + this.name)
    }
}
const instance = new FemaleDog("llj")
instance.print()

console.info("starting fuck female dog...")
fuckFemaleDog()