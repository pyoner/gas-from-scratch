export default function promiseMiddleware() {
    return (next) => (event) => {
        let result = next(event);
        if (result instanceof Promise) {
            let value = {}
            result.then((v) => value.valueOf = () => v);
            return value;
        }
        return result;
    }
}
