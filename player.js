const hostModel = require('./host');
const models = require('./Models');
const enums = require('./Enums');

var players = [];

exports.CreatePlayer = function (conn, message) {
    // check for host
    let host = hostModel.GetHostByGroupId(message.roomId)

    if (!host) {
        return "Unable to find host";
    }

    // setup player
    conn.isHost = false;
    conn.isPlayer = true;
    conn.host = host;
    conn.player = new models.Player(players.length, 'Player 1', 'red');

    // update host and player pool
    players.push(conn);
    host.players.push(conn);

    let response = {
        msg: enums.ServerResponses.PLAYER_CREATED,
        action: 'playerCreated',
        player: conn.player
    };

    conn.host.ws.send(JSON.stringify(response));
    return response;
}

exports.ParseCommand = function (conn, cmd) {
    switch (cmd) {
        case enums.ServerCommands.REMOVE_PLAYER:
            // remove from player pool
            let index = players.findIndex(function (p) { return p.id = conn.id });
            players.splice(index, 1);

            // remove from host pool
            hostModel.RemovePlayer(conn.host, conn.id);
            break;
        default:
            conn.ws.send(JSON.stringify("Unknown Command: " + cmd));
            break;
    }
}