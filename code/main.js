var conductor = require('m.conductor');

module.exports.loop = function () {
    conductor.run();

    //Game.spawns.Spawn1.createCreep([MOVE], "Fishy", {role: "goon"});

    if (Game.creeps['Fishy'] != undefined) {
        Game.creeps['Fishy'].moveTo(new RoomPosition(20, 43, "W2N7"));
    }
}