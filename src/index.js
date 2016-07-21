import * as app from './app';

for (let k in app) {
    global[k] = app[k];
}
