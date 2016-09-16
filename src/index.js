import { initApp } from './triggers';
import { schedulerMiddleware } from './scheduler';
import * as app from './app';

let middlewares = [
    schedulerMiddleware(global),
];
initApp(app, middlewares, global);
