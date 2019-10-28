var roleHarvester = require('role.harvester');
var utilStructures = require('util.structures');

var roleRepair = {

    run: function (creep) {

        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }

        if (creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }

        if (creep.carry.energy > 0) {

            var targets_repair = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
    
            targets_repair.sort(function (a, b) {
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
    
            //var targets_repair = Memory.damagedStructures;

            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

            if (targets_repair.length > 0) {

                var health = utilStructures.getHealth(targets_repair[0]);
                creep.say(Math.round(health * 100) / 100 + "%");

                if (creep.repair(targets_repair[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets_repair[0]);
                }
            } else {
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], );
                    } else {
                        creep.transfer(targets[0], RESOURCE_ENERGY)
                    }
                }
            }
        } else {

            var spns = creep.room.find(FIND_MY_SPAWNS);
            if ((creep.withdraw(spns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) { // && (Game.spawns['Spawn1'].energy > 200)) {
                creep.moveTo(spns[0]);
            }
        }
    }
};

module.exports = roleRepair;