const WEB_TYPES = ['doGet', 'doPost'];

//TODO: add check by script owner
export default function testMiddleware(test) {
    return (type) => (next) => (event) => {
        let func = test[type];
        if (func) {
            if (WEB_TYPES.indexOf(type) != -1 && event.parameter.test) {
                return func(event);
            }
        }
        return next(event);
    }
}
