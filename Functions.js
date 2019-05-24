const enums = require('./Enums');
const models = require('./Models');

const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
var hosts = [];
var players = [];

exports.ParseCommand = function (conn, message) {
    console.log("Received message:", message);

    if (conn.isHost) {
        HostCommand(conn, message);
        return;
    }

    else if (conn.isPlayer) {
        PlayerCommand(conn, message);
        return;
    }

    let response = "";

    switch (message.cmd) {
        case enums.ServerCommands.CREATE_HOST:
            let groupIdAssignment = generateGroupId();

            // configure host
            conn.isHost = true;
            conn.isPlayer = false;
            conn.groupId = groupIdAssignment;

            // update host pool
            hosts.push(conn);
            console.log(hosts);

            // update connection
            response = {
                msg: enums.ServerResponses.HOST_CREATED,
                action: 'hostCreated',
                hostId: conn.groupId
            }
            break;
        case enums.ServerCommands.CREATE_PLAYER:
            console.log("creating player");

            // check for host
            let host = hosts.find(h => {
                return h.groupId === message.roomId;
            })

            if (!host) {
                response = "Unable to find host";
                break;
            }

            // setup player
            conn.isHost = false;
            conn.isPlayer = true;
            conn.host = host;
            conn.player = new models.Player(players.length, 'Player 1', 'red');

            // update player pool
            players.push(conn);
            console.log(players);

            // update player connection and host connection
            response = {
                msg:  enums.ServerResponses.PLAYER_CREATED,
                action: 'playerCreated',
                player: conn.player
            };

            conn.host.ws.send(JSON.stringify(response));
            break;
        default:
            response = "Unknown Command: " + cmd;
            break;
    }

    conn.ws.send(JSON.stringify(response));
}

function HostCommand(conn, cmd) {

}

function PlayerCommand(conn, cmd) {

}

function generateGroupId() {
    return [...Array(4)].map(i => chars[Math.random() * chars.length | 0]).join``;
}