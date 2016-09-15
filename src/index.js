import { initApp } from './triggers';
import { initScheduler } from './scheduler';
import * as app from './app';

initScheduler(global);
initApp(app, global);
