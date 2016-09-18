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

    //return ContentService.createTextOutput('test handler');
    //return new Promise((resolve, reject) => {
    //setTimeout(resolve, 1000, ContentService.createTextOutput('test promise'));
    //})
    return p;
}
