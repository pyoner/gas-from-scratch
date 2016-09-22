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
    isUncaughtException = true;
    logError(err);
    try {
        process.emit('uncaughtException', err);
    } catch (e) {
        logError(e);
    }
}

function logError(err) {
    if (console && console.error && isFunction(console.error)) {
        console.error(err);
    }
}

function returnLog() {
    return ContentService.createTextOutput(process._stdout + process._stderr);
}

export function schedulerMiddleware(type) {
    return (next) => (event) => {
        let result;
        try {
            result = next(event);
        } catch (err) {
            logUncaughtException(err);
        } finally {
            try {
                let runned = false;
                while (!runned || items.length) {
                    runned = true;
                    scheduler();
                    process.emit('beforeExit');
                }
                process.emit('exit');
            } catch (err) {
                logUncaughtException(err);
            }
            if (process.stdout) {
                process.stdout.end();
            }
            if (process.stderr && process.stderr !== process.stdout) {
                process.stderr.end();
            }
            return isNullOrUndefined(result) || isUncaughtException ? returnLog() : (result.valueOf ? result.valueOf() : result);
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
