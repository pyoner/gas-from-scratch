import monkeyProcess from './monkeys/process'; // monkey patch for process events
import console from './console';
import { initApp } from './core';
import { schedulerMiddleware } from './middlewares/scheduler';
import promiseMiddleware from './middlewares/promise';
import { triggerMiddleware } from './middlewares/triggers';
import testMiddleware from './middlewares/test';

import * as test from '../tests';
import * as app from './app';

let middlewares = [
    schedulerMiddleware,
    promiseMiddleware,
    triggerMiddleware,
    testMiddleware(test),
];
initApp(app, middlewares, global);
