process
    .on('uncaughtException', (err) => {
        console.log('uncaughtException handler:', err);
        setTimeout(()=>console.log('setTimeout', 1000));// not run
    })
    .on('exit', () => {
        console.log('exit handler')
        throw new Error('test error from exit handler');
    })
