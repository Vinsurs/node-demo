import { isFunction } from "../shared";
import { ReactiveEffect, type EffectFn } from "./reactiveEffect"
import { type Ref, unref } from "./ref";

export type WatchStopHandle = () => void;
export interface WatchHandle extends WatchStopHandle {
    pause: () => void;
    resume: () => void;
    stop: () => void;
}
function createWatchHandle<T>(reactiveEffect: ReactiveEffect<T>): WatchHandle {
    const handle: WatchHandle = reactiveEffect.stop.bind(reactiveEffect)
    handle.pause = reactiveEffect.pause.bind(reactiveEffect)
    handle.resume = reactiveEffect.resume.bind(reactiveEffect)
    handle.stop = reactiveEffect.stop.bind(reactiveEffect)
    return handle
}
export function watchEffect(effect: EffectFn): WatchHandle {
    const reactiveEffect = new ReactiveEffect(effect)
    reactiveEffect.run()
    return createWatchHandle(reactiveEffect)
}
export type WatchSource<V> = Ref<V> | (() => V)
export type WatchCallback<V> = (n: V, o: V) => void
export type WatchOptions = {
    immediate?: boolean
    once?: boolean
}
export function watch<V>(source: WatchSource<V>, cb: WatchCallback<V>, options?: WatchOptions): WatchHandle {
    options = Object.assign<WatchOptions, WatchOptions>({ immediate: false, once: false }, options)
    function getSourceValue() {
        return isFunction(source) ? source() : unref(source)
    }
    let oldValue = getSourceValue()
    let flag = options.immediate ? 1 : 0
    const effect = function () {
        const newValue = getSourceValue()
        if (flag) {
            cb(newValue, oldValue)
            if (options.once) {
                reactiveEffect.stop()
            }
        }
        oldValue = newValue
        flag++;
    }
    const reactiveEffect = new ReactiveEffect(effect)
    reactiveEffect.run()
    return createWatchHandle(reactiveEffect)
}