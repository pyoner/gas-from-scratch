import { comp, identity, into, map, filter } from 'transducers-js';

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

function initMiddlewares(type, middlewares) {
    let xf = comp(filter(Boolean), map((m) => m(type)));
    return into([], xf, middlewares);
}

export function initApp(app, middlewares = [], g = global) {
    for (let name in app) {
        let obj = app[name];
        if (TRIGGER_TYPES.indexOf(name) != -1) {
            let m = initMiddlewares(name, middlewares);
            g[name] = comp(...m)(obj);
        } else {
            g[name] = obj;
        }
    }
}
