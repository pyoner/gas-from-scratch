import process from '../monkeys/process'; // monkey patch for process events
import console from '../console';
import { isFunction, isNullOrUndefined } from 'util';

Object.assign(global, { setTimeout, clearTimeout });
let items = [];

function scheduler() {
    while (items.length) {
        let [id, time, cb, args] = items.shift();
        let delta = time - Date.now();
        if (delta > 0) {
            Utilities.sleep(delta);
        }

        try {
            cb(...args);
        } catch (err) {
            process.emit('uncaughtException', err);
        }
    }
}

let isUncaughtException = false;

function logUncaughtException(err) {
    let count = process.listenerCount('uncaughtException');
    if (count) {
        try {
            process.emit('uncaughtException', err);
        } catch (e) {
            isUncaughtException = true;
            console.error(e);
            process.exit(1);
        }
    } else {
        isUncaughtException = true;
        console.error(err);
        process.exit(7);
    }
}

function returnLog() {
    return ContentService.createTextOutput(process._stdout + process._stderr);
}

function valueOf(obj) {
    return isFunction(obj.valueOf) ? obj.valueOf() : obj;
}

export function schedulerMiddleware(type) {
    return (next) => (event) => {
        let result;
        try {
            result = next(event);
        } catch (err) {
            logUncaughtException(err);
        } finally {
            if (!isUncaughtException) {
                try {
                    let runned = false;
                    while (!runned || items.length) {
                        runned = true;
                        scheduler();
                        process.emit('beforeExit');
                    }
                    process.exit(0);
                } catch (err) {
                    logUncaughtException(err);
                }
            }
            return isNullOrUndefined(result) || isUncaughtException ? returnLog() : valueOf(result);
        }
    }
}

export function setTimeout(cb, ms, ...args) {
    let id = parseInt(Math.random().toString().slice(2));
    let t = Date.now() + ms;
    let item = [id, t, cb, args];

    for (let i = 0; i < items.length; i++) {
        let time = items[i][1];
        if (t < time) {
            items.splice(i, 0, item);
            return id;
        }
    }

    items.push(item);
    return id;
}

export function clearTimeout(id) {
    for (let i = 0; i < items.length; i++) {
        let itemId = items[i][0];
        if (itemId == id) {
            items.splice(i, 1);
            break;
        }
    }
}
