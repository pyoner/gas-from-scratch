var test = require('tape');

var p = new Promise((resolve, reject) => {
    test.onFinish(() => {
        resolve('tape finished');
    });
});

test('simple test', (t) => {
    t.equal(1, 1);
    t.end();
});

test('process beforeExit', (t) => {
    process.once('beforeExit', () => {
        t.comment('beforeExit handler');
        t.end();
    });
})

test('process exit', (t) => {
	process.once('exit', () => {
		t.comment('exit handler');
		t.end();
	});
})

p.then(console.log.bind(console));
