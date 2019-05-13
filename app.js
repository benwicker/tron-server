const Player = require('./player');
import { Server } from 'ws';

const wss = new Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('echo: ' + message);
  });

  let player = new Player(0, 'red');

  ws.send(player);
});