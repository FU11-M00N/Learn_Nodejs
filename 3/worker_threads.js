 const {Worker, isMainThread, parentPort } = require('worker_threads')

 if (isMainThread){ //메인 스레드
    const woker = new Worker(__filename);
    woker.on('message', (value) => console.log('워커로부터',value));
    woker.on('exit',() => console.log('워커 끝~'));
    woker.postMessage('ping');
 } else { // 워커 스레드
  parentPort.on('message', (value) => {
    console.log('부모로부터',value);
    parentPort.postMessage('pong');
    parentPort.close();
  })
 }