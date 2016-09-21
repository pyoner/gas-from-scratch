import { format } from 'util';

export class Console {
    constructor(stdout, stderr = null) {
        this._stdout = stdout;
        this._stderr = stderr || stdout;
    }

    _format(type, args, asString = false) {
        let data = {
            type,
            date: Date.now(),
            message: asString ? format(...args) : args
        }

        return asString ? `${data.date}\t[${data.type}]\t${data.message}` : data;
    }

    _write(type, args, stream = this._stdout) {
        stream.write(this._format(type, args, !stream.objectMode));
    }

    log(...args) {
        this._write('log', args);
    }

    info(...args) {
        this._write('info', args);
    }

    error(...args) {
        this._write('error', args, this._stderr);
    }

    warn(...args) {
        this._write('warn', args, this._stderr);
    }
}

const console = new Console(process.stdout, process.stderr);
global.console = console;
export default console;
