import EventEmitter from 'events';
import { comp, identity } from 'transducers-js';

export const TRIGGER_FUNC_NAMES = {
    onOpen: 'Open',
    onEdit: 'Edit',
    onInstall: 'Install',
    doGet: 'Get',
    doPost: 'Post',
}

class TriggerEmitter extends EventEmitter {}
export const emitter = new TriggerEmitter();

function triggerMiddelware(name, cb) {
    return (next) => (event) => {
        emitter.emit(`before${name}`, event);
        let result = cb(event);
        emitter.emit(`after${name}`, event);
        return next(result);
    }
}

export function initApp(app, middlewares = [], g = global) {
    for (let k in app) {
        let func = app[k];
        let name = TRIGGER_FUNC_NAMES[k];
        g[k] = name ? comp(...middlewares, triggerMiddelware(name, func))(identity) : func;
    }
}
