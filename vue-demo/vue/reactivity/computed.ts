import { isFunction } from "../shared"
import { ReactiveEffect } from "./reactiveEffect"

class ComputedRef<T = any> {
    __v_isReadonly = true
    __v_isRef = true
    _cache: T
    _getter: ComputedGetter<T>
    constructor(getter: ComputedGetter<T>) {
        this._getter = getter
        this._subscribe()
    }
    get value(): T {
        if (this._cache) {
            return this._cache
        }
        return this._getter()
    }
    _subscribe() {
        // const reactiveEffect = new ReactiveEffect()
    }
}
class WritableComputedRef<T = any, S = T> {}
export type ComputedGetter<T> = (oldValue?: T) => T
export type ComputedSetter<T> = (newValue?: T) => void
export type WritableComputedOptions<T, S = T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<S>
}
export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>
export function computed<T, S = T>(options: WritableComputedOptions<T, S>): WritableComputedRef<T, S>
export function computed<T, S = T>(getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T, S>): any {
    if (isFunction(getterOrOptions)) {
        return new ComputedRef<T>(getterOrOptions)
    }
}