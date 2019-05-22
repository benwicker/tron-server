const WebSocket = require('ws');

class Player {
  constructor(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  debugger;
  console.log("Connect to new host");

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(JSON.stringify('echo: ' + message));
  });

  let message = {player: new Player(0, 'player 1', 'red')} 
  ws.send(JSON.stringify(message));
});