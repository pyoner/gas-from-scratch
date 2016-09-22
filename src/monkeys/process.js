import EventEmitter from 'events';
import concat from 'concat-stream';

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

// stdout/stderr
const CACHE_SIZE = 100 * 1024;

function flush(key, data) {
    process[key] = data;
    let cache = CacheService.getScriptCache();
    let value = (cache.get(key) || '').toString() + data;
    value = value.slice(-CACHE_SIZE)
    cache.put(key, value);
}
process.stderr = concat({ encoding: 'string' }, (data) => flush('_stderr', data));
process.stdout = concat({ encoding: 'string' }, (data) => flush('_stdout', data));

process.exit = (code = 0) => {
    process.exitCode = code;
    try {
        process.emit('exit', code);
    } catch (err) {
        console.error(err);
    }
    process.stdout.end();
    process.stderr.end();
}
export default process;
