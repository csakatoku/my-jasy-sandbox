(function(globals, undef) {
    core.Class('r.model.Gacha', {
        include: [ r.model.Prototype ],

        construct: function(args) {
            this.init(args);
        },

        members: {
            getColllections: function() {
                if (this.__collections === undef) {
                    this.__collections = this.__getCollectionsImpl();
                }
                return this.__collections;
            },

            __getCollectionsImpl: function() {
                var c = [];
                var collections = this.collections;
                Object.keys(collections).forEach(function(id) {
                    var crew = r.model.Crew.get(id);
                    var probability = collections[id];
                    c.push({
                        crew: crew,
                        probability: probability
                    });
                });
                return c;
            },

            draw: function() {
                var collections = this.getColllections();
                var sum = collections.reduce(function(a, v) {
                    return v.probability + a;
                }, 0);
                var value = r.util.Random.randInt(0, sum - 1);
                var min = 0, max = 0;
                for (var i = 0, length = collections.length; i < length; i++) {
                    var p = collections[i].probability;
                    max += p;
                    if (min <= value && value < max) {
                        return collections[i].crew;
                    }
                    min += p;
                }
                return null;
            }
        }
    });

    r.model.Prototype.expose(r.model.Gacha);
}(this));
