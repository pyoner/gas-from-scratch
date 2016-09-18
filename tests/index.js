import test from 'tape';

export function doGet(event) {
    let s = '';
    test.createStream()
        .on('data', (value) => { s += value });

    let p = new Promise((resolve, reject) => {
        test.onFinish(() => {
            let result = ContentService.createTextOutput(s);
            resolve(result);
        });
    });

    test('simple test', (t) => {
        t.equal(1, 1);
    });

    //return ContentService.createTextOutput('test handler');
    //return new Promise((resolve, reject) => {
        //setTimeout(resolve, 1000, ContentService.createTextOutput('test promise'));
    //})
    return p;
}
