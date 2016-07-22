export class JSONCache {

    constructor(service) {
        this.service = service;
    }

    get(key) {
        var value = this.service.get(key);
        return value === null ? value : JSON.parse(value);
    }

    put(key, value, exp) {
        value = JSON.stringify(value);
        if (exp !== undefined) {
            this.service.put(key, value, exp);
        } else {
            this.service.put(key, value);
        }
    }

    remove(key) {
        this.service.remove(key);
    }

}
