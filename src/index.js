import { initScheduler, wrapTrigger } from './scheduler';
import * as app from './app';

initScheduler(global);
Object.assign(global, app);
