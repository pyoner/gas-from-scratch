process.on('uncaughtException', (err)=>console.log(`Caught exception: ${err}`))
throw new Error('Test uncaught exception');
