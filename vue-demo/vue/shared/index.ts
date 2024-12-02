export function isObject(target: unknown): target is object {
    return typeof target === "object" && target !== null
}
export function isFunction(target: unknown): target is ((...args: unknown[]) => any) {
    return typeof target === "function"
}
export function hasOwn(o: object, v: PropertyKey): boolean {
    return Object.hasOwn(o, v)
}