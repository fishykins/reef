module.exports = {
    sqrDistance: function (posA, posB) {
        var x = Math.abs(posA.x - posB.x);
        var y = Math.abs(posA.y - posB.y);

        return (x * x) + (y * y);
    },

    distance: function (posA, posB) {
        return Math.sqrt(sqrDistance(posA, posB));
    }
}