export interface EffectFn<T = any> {
    (): T
}

let activeEffect: ReactiveEffect = null

const effectsMap = new WeakMap<object, Map<string, Set<ReactiveEffect>>>()

export class ReactiveEffect<T = any> {
    _paused: boolean
    deps: Set<ReactiveEffect<T>>
    fn: EffectFn<T>
    constructor(fn: EffectFn<T>) {
        this.fn = fn
    }
    pause() {
        this._paused = true
    }
    resume() {
        this._paused = false
        this.run()
    }
    run(): T {
        if (this._paused) return
        activeEffect = this
        const result = this.fn()
        activeEffect = null
        return result
    }
    stop() {
        this.deps.delete(this)
    }
}

function getSubscribersForProperty(target: object, key: string) {
    let map = effectsMap.get(target)
    if (!map) {
        map = new Map<string, Set<ReactiveEffect>>()
        effectsMap.set(target, map)
    }
    let effects = map.get(key)
    if (!effects) {
        effects = new Set<ReactiveEffect>()
        map.set(key, effects)
    }
    return effects
}

export function track(target, key) {
    if (activeEffect) {
        const effects = getSubscribersForProperty(target, key)
        effects.add(activeEffect)
        activeEffect.deps = effects
    }
}
export function trigger(target, key) {
    const effects = getSubscribersForProperty(target, key)
    effects.forEach(effect => effect.run())
}