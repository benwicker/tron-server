const WebSocket = require('ws');
const models = require('./Models');
const functions = require('./Functions');

// Variables
var connections = [];
const serverPort = 3000;
var idAssignment = 0;

const wss = new WebSocket.Server({ port: serverPort });

console.log("Server running on port: " + serverPort);

wss.on('connection', function connection(ws) {
  let conn = {
    id: idAssignment,
    ws: ws,
    isHost: false,
    isPlayer: false,
    groupId: null
  }
  idAssignment++;

  // add conn to connections
  connections.push({
    conn
  });

  console.log(connections);
  console.log("Connect to new host with connection number: " + conn.id);

  // configure message passing
  ws.on('message', function incoming(message) {
    functions.ParseCommand(conn, JSON.parse(message));
  });

  // close function
  ws.on('close', function close(e) {
    console.log("Closing connection: ", conn.id);
  })
});