module.exports = {
    //Returns the health out of 100
    getHealth: function (object) {
        return (object.hits / object.hitsMax) * 100;
    },

    getRepairableStructures: function (roomName) {

    }
}