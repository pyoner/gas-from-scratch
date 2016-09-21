import test from 'tape';

export function doGet(event) {
    console.log('Test');
    //let s = '';
    //test.createStream()
        //.on('data', (value) => { s += value });

    //let p = new Promise((resolve, reject) => {
        //test.onFinish(() => {
            //resolve(ContentService.createTextOutput(s));
        //});
    //});

    test('test 1', (t) => {
        t.equal(1, 1);
        t.end();
    });

    test('test 2', (t) => {
        t.equal(2, 2);
        t.end();
    });

    test('test process beforeExit', (t) => {
        process.once('beforeExit', () => {
            t.equal(3, 3);
            t.end();
        });
    })

    //test('process exit', (t)=>{
    //process.once('exit', ()=>{
    //t.comment('exit handler');
    //t.end();
    //});
    //})
    //return p;
}
