const enums = require('./Enums');

var groupIdAssignment = 0;
var hosts = [];
var players = [];

exports.ParseCommand = function (conn, cmd) {
    console.log("Received message:", cmd);

    if (conn.isHost) {
        HostCommand(conn, cmd);
        return;
    }

    else if (conn.isPlayer) {
        PlayerCommand(conn, cmd);
        return;
    }

    let message = "";

    switch (cmd) {
        case enums.ServerCommands.CREATE_HOST:
            // configure host
            conn.isHost = true;
            conn.isPlayer = false;
            conn.groupId = groupIdAssignment;
            groupIdAssignment++;
            
            // update connection
            message = "Creating Host"
            break;
        case enums.ServerCommands.CREATE_PLAYER:
            conn.isHost = false;
            conn.isPlayer = true;
            message = "Creating Player";
            break;
        default:
            message = "Unknown Command: " + cmd;
            break;
    }

    conn.ws.send(JSON.stringify(message));
} 

function HostCommand(conn, cmd) {
    
    console.log(hosts);
}

function PlayerCommand(conn, cmd) {

}