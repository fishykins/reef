var mathf = require("util.mathf");


var roleHarvester = {
    run: function (creep) {

        if (creep.memory.loaded == undefined) {
            creep.memory.loaded = false;
        }

        if (creep.carry.energy < creep.carryCapacity && !creep.memory.loaded) {
            var sources = _.filter(creep.room.find(FIND_SOURCES), (source) => source.energy > 0);

            sources.sort(function (a, b) {
                distA = mathf.sqrDistance(a.pos, creep.pos);
                distB = mathf.sqrDistance(b.pos, creep.pos);

                if (distA < distB) {
                    return -1;
                }
                if (distB < distA) {
                    return 1;
                }
                return 0;
            });

            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                });
            }
        } else {
            creep.memory.loaded = (creep.carry.energy > 0);

            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            } else {
                if (creep.room.controller) {
                    creep.moveTo(creep.room.controller);
                    creep.upgradeController(creep.room.controller);
                    creep.say('🐟');
                    return;
                }
            }
        }

    }
};
module.exports = roleHarvester;