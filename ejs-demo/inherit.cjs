const extend = require('static-extend')
class Animal {
    constructor(kind, name) {
        this.kind = kind;
        this.name = name;
    }
    static get Properties() {
        return []
    }
    static printInfo() {
        console.info("Class Animal info")
    }
    toString() {
        return "Animal: " + this.kind + " " + this.name
    }
}
// Animal.extend = extend(Animal)
class Dog extends Animal {
    constructor(kind, name, sex) {
        super(kind, name);
        this.sex = sex;
    }
    getParentProp() {
        console.info("getParentProp:", Animal.Properties)
    }
}
// Animal.extend(Dog)
const femaleDog = new Dog("Dog", "linDog", "female")
console.info("femaleDog", femaleDog.toString(), Dog.printInfo())
