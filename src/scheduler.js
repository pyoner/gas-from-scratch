import { emitter } from './triggers';

let inited = false;
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
        } catch (e) {
            console.error(e);
        }
    }
}

export function initScheduler(g = global) {
    if (inited) {
        return
    }
    Object.assign(g, { setTimeout, clearTimeout });
    emitter.on('afterGet', scheduler);
    emitter.on('afterPost', scheduler);
    inited = true;
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
