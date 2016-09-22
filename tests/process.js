process
    .on('uncaughtException', (err) => {
        console.log('uncaughtException handler:', err);
        setTimeout(()=>console.log('setTimeout', 1000));// not run
        throw new Error('throw Error inside uncaughtException handler');
    })
    .on('exit', () => {
        console.log('exit handler')
        throw new Error('test error from exit handler');
    })
