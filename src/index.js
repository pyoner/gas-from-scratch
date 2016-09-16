import { initApp } from './triggers';
import promiseMiddleware from './middlewares/promise';
import { schedulerMiddleware } from './scheduler';
import * as app from './app';

let middlewares = [
    schedulerMiddleware(global),
    promiseMiddleware(),
];
initApp(app, middlewares, global);
