
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');


// Initializing a class definition

function ManageRole(roleTitle, roleMethod, allCreeps, count) {
    var creeps = _.filter(allCreeps, (creep) => creep.memory.role == roleTitle);
    
    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

    if (creeps.length < count) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
            role: roleTitle
        });

        //var newName = Game.spawns['spawn1'].createCustomCreep(energy, roleTitle);

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
        info.push(ManageRole("builder", roleBuilder.run, creeps, 2));
    },

    Section: class {
        constructor(room) {
            this.room = room;
            this.name = "goon";
        }
    }
}