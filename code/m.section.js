var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var analRoom = require('anal.room');
require('prototype.spawn')();

// Initializing a class definition
function ManageRole(roleTitle, roleMethod, allCreeps, count) {
    var creeps = _.filter(allCreeps, (creep) => creep.memory.role == roleTitle);

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

    if (creeps.length < count) {
        var newName = Game.spawns['Spawn1'].createCustomCreep(energy, roleTitle);

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


function MapRoom(roomName) {

}

module.exports = {
    run: function (roomName) {
        var creeps = Game.rooms[roomName].find(FIND_MY_CREEPS);

        for (var creep in creeps) {
            if (creep.memory.role == undefined) {
                creep.memory.role = "harvester";
            }
        }

        //Garbage and auto init
        if (Game.time % 60 == 0) {
            analRoom.run(roomName);
        }

        var info = [];
        //Add all roles here
        info.push(ManageRole("harvester", roleHarvester.run, creeps, 4));
        info.push(ManageRole("builder", roleBuilder.run, creeps, 1));
        info.push(ManageRole("repairer", roleRepairer.run, creeps, 1));

        var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        });

        for (let i = 0; i < towers.length; i++) {
            var tower = towers[i];
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    },

    Section: class {
        constructor(room) {
            this.room = room;
            this.name = "goon";
        }
    }
}