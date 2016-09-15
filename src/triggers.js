import EventEmitter from 'events';

let wrapped = []

export const TRIGGER_FUNC_NAMES = {
    onOpen: 'Open',
    onEdit: 'Edit',
    onInstall: 'Install',
    doGet: 'Get',
    doPost: 'Post',
}

export const TRIGGER_NAMES = [
    'Open',
    'Edit',
    'Install',
    'Get',
    'Post',
];

class TriggerEmitter extends EventEmitter {}
export const emitter = new TriggerEmitter();

export function wrapTrigger(name, cb) {
    if (TRIGGER_NAMES.indexOf(name) == -1) {
        throw new Error(`Invalid trigger name "${name}" not in ${TRIGGER_NAMES}`);
    }

    if (name in wrapped) {
        throw new Error(`Trigger "${name}" already wrapped`);
    }
    wrapped.push(name);

    return function(event) {
        emitter.emit(`before${name}`, event);
        let result = cb(event);
        emitter.emit(`after${name}`, event);
        return result;
    }
}

export function initApp(app, g = global) {
    for (let k in TRIGGER_FUNC_NAMES) {
        let func = app[k];
        if (func) {
            let name = TRIGGER_FUNC_NAMES[k];
            g[k] = wrapTrigger(name, func);
        }
    }
}
