var hosts = [];
const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

exports.CreateHost = function (conn) {
    // configure new host
    conn.isHost = true;
    conn.isPlayer = false;
    conn.groupId = generateGroupId();
    conn.players = [];

    // update host pool
    hosts.push(conn);

    // return host connection information
    return {
        msg: enums.ServerResponses.HOST_CREATED,
        action: 'hostCreated',
        hostId: conn.groupId
    };
}

exports.GetHostByGroupId = function (id) {
    return hosts.find(h => {
        return h.groupId === id;
    })
}

exports.ParseCommand = function (conn, cmd) {
    
}

exports.RemovePlayer = function (host, playerId) {
    // remove player from list
    let index = host.players.findIndex(function (p) { return p.id == playerId });
    host.players.splice(index, 1);

    // update host with change
    let update = {
        msg: enums.ServerResponses.PLAYER_REMOVED,
        action: 'playerRemoved',
        playerId: playerId
    };
    host.ws.send(JSON.stringify(update));
}

function generateGroupId() {
    return [...Array(4)].map(i => chars[Math.random() * chars.length | 0]).join``;
}