import {
    JSONCache
} from './json_cache';

export class CacheStream {
    constructor(opts) {
        this._opts = Object.assign({}, opts);
        this._cache = new JSONCache(CacheService.getScriptCache());
    }

    write(data) {
        let expiration = this._opts.expiration;
        let put = this._cache.put.bind(this._cache, this._opts.key, data);
        if (expiration) {
            put(expiration);
        } else {
            put();
        }
    }

    read() {
        let data = this._cache.get(this._opts.key)
    }
}

export class Console {
    constructor(stdout, stderr = null) {
        this._stdout = stdout;
        this._stderr = stderr;
    }

    _format(type, args) {
        let data = {
            type,
            date: Date.now(),
            message: args
        }
        return JSON.stringify(data);
    }

    log(...args) {
        this._stdout.write(this._format('log', args));
    }
}

let stdout = new CacheStream({
    key: '_console'
});
export default
let console = new Console(stdout);
