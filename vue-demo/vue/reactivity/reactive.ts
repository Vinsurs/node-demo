import { hasOwn, isObject } from '../shared'
import { track, trigger } from './reactiveEffect'

const REACTIVE_KEY = "__v_isReactive"

export type Reactive<T extends object> = T & {
    [key in typeof REACTIVE_KEY]: true
}

export function reactive<T extends object>(target: T): Reactive<T> {
    const reactiveObj = new Proxy(target, {
        get(target, p, receiver) {
            track(target, p)
            return Reflect.get(target, p, receiver)
        },
        set(target, p, newValue, receiver) {
            const result = Reflect.set(target, p, newValue, receiver)
            trigger(target, p)
            return result
        }
    })
    Object.defineProperty(reactiveObj, REACTIVE_KEY, {
        value: true,
        writable: false
    })
    // @ts-ignore
    return reactiveObj
}
export function isReactive<T extends object = any>(value: T): value is Reactive<T> {
    return isObject(value) && hasOwn(value, REACTIVE_KEY) && Reflect.get(value, REACTIVE_KEY) === true
}