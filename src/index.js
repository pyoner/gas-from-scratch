import { initApp } from './core';
import { schedulerMiddleware } from './middlewares/scheduler';
import promiseMiddleware from './middlewares/promise';
import { triggerMiddleware } from './middlewares/triggers';
import * as app from './app';

let middlewares = [
    schedulerMiddleware(global),
    promiseMiddleware,
    triggerMiddleware,
];
initApp(app, middlewares, global);
