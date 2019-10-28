var utilStructures = require('util.structures');
var utilStrings = require('util.strings');

module.exports = {
    run: function (roomName) {
        console.log("Analysing room " + roomName);

        var structuresToRepair = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });

        structuresToRepair.sort(function (a, b) {
            var healthA = utilStructures.getHealth(a);
            var healthB = utilStructures.getHealth(b);

            if (healthA < healthB) {
                return -1;
            }
            if (healthB < healthA) {
                return 1;
            }
            return 0;
        });

        

        structuresToRepair.forEach(structure => {
            var health = utilStructures.getHealth(structure);
            var bar = utilStrings.getBar(health);
            console.log(structure + ": " + bar + " " + health);
        });

        Memory.damagedStructures = structuresToRepair;
    }
}