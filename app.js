const WebSocket = require('ws');

class Player {
  constructor(id, color) {
    this.id = id;
    this.color = color;
  }
}

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  debugger;
  console.log("Connect to new host");

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('echo: ' + message);
  });


  let player = new Player(0, 'red');
  ws.send(JSON.stringify(player));
});