import test from 'tape';
import { identity } from 'transducers-js';
import { initApp, TRIGGER_TYPES } from '../../src/core';

test('core initApp', (t) => {
    let app = {
        notTrigger: identity,
        onOpen: identity,
        onInstall: identity,
        onEdit: identity,
        doPost: identity,
        doGet: identity,
    }

    t.test('test context', (t) => {
        let context = {};
        initApp(app, [], context);

        t.deepEqual(Object.keys(context), Object.keys(app));
        t.end();
    });
});
