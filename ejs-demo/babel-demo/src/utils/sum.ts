export function sum(...args: number[]) {
    return args.reduce((a, b) => a + b, 0);
}
export async function asyncFun() {
    await Promise.resolve(5);
    return "asyncFun";
}