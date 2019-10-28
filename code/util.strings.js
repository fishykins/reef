module.exports = {
    getBar: function (percentage, width = 32) {
        var bar = "[";
        var fraction = fraction / 100;
        var notches = width / 2;
        var fill = fraction * notches;
        
        for (i = 0; i < notches; i++) {
            bar += (i < fill) ? "|" : "'";
        }

        bar += "]";

        return bar;
    }
}