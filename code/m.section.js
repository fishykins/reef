var roleHarvester = require('role.harvester');

// Initializing a class definition

function ManageRole(roleTitle, roleMethod, allCreeps, count) {
    var creeps = _.filter(allCreeps, (creep) => creep.memory.role == roleTitle);
    //console.log(roleTitle + " count = " + creeps.length);

    if (creeps.length < count) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
            role: roleTitle
        });

        if (!(newName < 0)) {
            console.log('Spawning new ' + roleTitle + ': ' + newName);
        }
    }

    for (var name in creeps) {
        var creep = creeps[name];
        if (roleMethod != undefined) {
            roleMethod(creep);
        }
    }

    return [roleTitle, creeps.length];
}

module.exports = {
    run: function (roomName) {
        var creeps = Game.rooms[roomName].find(FIND_MY_CREEPS);

        var info = [];
        //Add all roles here
        info.push(ManageRole("harvester", roleHarvester.run, creeps, 5));
    },

    Section: class {
        constructor(room) {
            this.room = room;
            this.name = "goon";
        }
    }
}