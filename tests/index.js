import test from 'tape';

export function doGet(event) {
    let s = '';
    test.createStream()
        .on('data', (value) => { s += value });

    let p = new Promise((resolve, reject) => {
        test.onFinish(() => {
            resolve(ContentService.createTextOutput(s));
        });
    });

    test('simple test', (t) => {
        t.equal(1, 1);
        t.end();
    });

    test('process beforeExit', (t)=>{
        process.once('beforeExit', ()=>{
            t.comment('beforeExit handler');
            t.end();
        });
    })

    return p;
}
