var mSection = require('m.section');

function Initialize() {
    Memory.roomIndex = 0;
    Memory.initialized = true;
}


function getRoom(index) {

    var rooms = Memory.rooms;

    if (Game.time % 60 != 0) {
        if (rooms != undefined) {
            return rooms[index];
        }
    }

    rooms = [];

    for (var roomName in Game.rooms) {
        //console.log('Room ' + roomName + ' (' + rooms.length + ') has ' + Game.rooms[roomName].energyAvailable + ' energy');
        rooms.push(roomName);
    }

    console.log("Room cache has been updated");

    Memory.rooms = rooms;
    return rooms[index];
}

function garbageCollection() {
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}


module.exports = {
    //Loads memory
    run: function () {
        //Init
        if (Memory.initialized == undefined) {
            Initialize();
        }

        //Garbage and auto init
        if (Game.time % 60 != 0) {
            garbageCollection();
            Initialize();
        }

        //Load memory
        var room = getRoom(Memory.roomIndex);

        if (room != undefined) {
            mSection.run(room);
        }

        Memory.roomIndex++;
        if (Memory.roomIndex >= Memory.rooms.length) Memory.roomIndex = 0;

    }
}