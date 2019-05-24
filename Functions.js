const enums = require('./Enums');
const models = require('./Models');
const hostModel = require('./host');
const playerModel = require('./player');

var players = [];

exports.ParseCommand = function (conn, message) {
    console.log("Received message:", message);

    if (conn.isHost) {
        hostModel.ParseCommand(conn, message);
        return;
    }

    else if (conn.isPlayer) {
        playerModel.ParseCommand(conn, message);
        return;
    }

    let response = "";

    switch (message.cmd) {
        case enums.ServerCommands.CREATE_HOST:
            response = hostModel.CreateHost(conn);
            break;
        case enums.ServerCommands.CREATE_PLAYER:
            response = playerModel.CreatePlayer(conn, message);
            break;
        case enums.ServerCommands.REMOVE_PLAYER:
            break;
        default:
            response = "Unknown Command: " + cmd;
            break;
    }

    conn.ws.send(JSON.stringify(response));
}

