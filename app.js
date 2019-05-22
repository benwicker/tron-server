const WebSocket = require('ws');
const models = require('./Models');


// Variables
const serverPort = 3000;

const wss = new WebSocket.Server({ port: serverPort });

console.log("Server running on port: " + serverPort);

wss.on('connection', function connection(ws) {
  console.log("Connect to new host");

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(JSON.stringify('echo: ' + message));
  });

  let message = {player: new models.Player(0, 'player 1', 'red')} 
  ws.send(JSON.stringify(message));
});