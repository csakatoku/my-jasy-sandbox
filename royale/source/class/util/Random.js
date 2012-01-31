core.Module('r.util.Random', {
    randInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
