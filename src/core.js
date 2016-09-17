import { comp, identity } from 'transducers-js';

export const TRIGGER_TYPES = [
    'onOpen',
    'onEdit',
    'onInstall',
    'doGet',
    'doPost',
]

function identityMiddleware() {
    return identity;
}

export function initApp(app, middlewares = [], g = global) {
    for (let name in app) {
        let obj = app[name];
        if (TRIGGER_TYPES.indexOf(name) != -1) {
            let m = middlewares
                .concat(identityMiddleware)
                .map((middleware) => middleware(name));
            g[name] = comp(...m)(obj);
        } else {
            g[name] = obj;
        }
    }
}
