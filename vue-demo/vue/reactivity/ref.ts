import { isFunction } from '../shared'
import { track, trigger } from './reactiveEffect'

class RefImpl<V> {
    __v_isRef = true
    _rawValue: V
    constructor(value: V) {
        this._rawValue = value
    }
    get value() {
        track(this, "value")
        return this._rawValue
    }
    set value(newValue) {
        this._rawValue = newValue
        trigger(this, "value");
    }
}
class GetterRefImpl<V> {
    __v_isReadonly = true
    __v_isRef = true
    _getter: () => V
    constructor(getter: () => V) {
        this._getter = getter
    }
    get value(): V {
        return this._getter()
    }
}
export type Ref<T = any> = RefImpl<T>
export type MaybeRef<T> = T | Ref<T>
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)
export function ref<T>(value?: T) {
    return new RefImpl<T>(value)
}
export function isRef<T>(r: Ref<T> | unknown): r is Ref<T> {
    return r instanceof RefImpl
}

export function unref<T>(ref: MaybeRef<T>): T {
    return isRef(ref) ? ref.value : ref
}
export function toRef<T>(value: T): T extends () => infer R ? Readonly<Ref<R>> : T extends Ref ? T : Ref<T> {
    if (isFunction(value)) {
        // @ts-ignore
        return new GetterRefImpl(value)
    } else if (isRef(value)) {
        // @ts-ignore
        return value
    } else {
        // @ts-ignore
        return ref(value)
    }
}
export function toValue<T>(source: MaybeRefOrGetter<T>): T {
    if (isFunction(source)) {
        return source()
    }
    return unref(source)
}