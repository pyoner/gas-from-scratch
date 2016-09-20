import EventEmitter from 'events';

const funcs = [
    'addListener',
    'emit',
    'setMaxListeners',
    'on',
    'once',
    'removeListener',
    'removeAllListeners',
    'listeners',
    'listenerCount',
]

let p = new EventEmitter();

for (let i = 0; i < funcs.length; i++) {
    let k = funcs[i];
    process[k] = p[k].bind(p);
}
