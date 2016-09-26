import { schedulerMiddleware } from './middlewares/scheduler';
import promiseMiddleware from './middlewares/promise';
import { triggerMiddleware } from './middlewares/triggers';
import { webActionMiddleware, testAction, logAction } from './middlewares/webActions';

import { initApp } from './core';
import * as test from '../tests';
import * as app from './app';

let middlewares = [
    schedulerMiddleware,
    promiseMiddleware,
    triggerMiddleware,
    webActionMiddleware('action', {
        test: testAction(test),
        log: logAction(['devex.soft@gmail.com']),
    }),
];
initApp(app, middlewares, global);
