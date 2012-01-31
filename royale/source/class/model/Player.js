core.Class('r.model.Player', {
    include: [ r.Observable ],

    construct: function() {
        this.listen('app.boot', this.onGameBooted);
    },

    properties: {
        coins: {
            type: 'integer',
            init: 100,
            apply: function(value) {
                this.invoke('player.coins', this);
            }
        },

        energy: {
            type: 'integer',
            init: 10,
            apply: function(value) {
                this.invoke('player.energy', this);
            }
        },

        maxEnergy: {
            type: 'integer',
            init: 10,
            apply: function(value) {
                this.invoke('player.max_energy', this);
            }
        },

        xp: {
            type: 'integer',
            init: 0,
            apply: function(value) {
                this.invoke('player.xp', this);
            }
        },
    },

    members : {
        regenerateEnergy: function() {
            var now = Date.now();
            var delta = now - this.__lastEnergyGenerated;
            var period = 10 * 1000;
            if (delta > period) {
                var generated = Math.floor(delta / period);
                var energy = Math.min(this.getEnergy() + generated, this.getMaxEnergy());
                this.setEnergy(energy);
                this.__lastEnergyGenerated = now;
                if (core.Env.isSet('debug')) {
                    console.log("energy regenerated");
                }
            }
        },

        onGameBooted: function() {
            var self = this;
            this.__lastEnergyGenerated = Date.now();
            this.__interval = setInterval(function() {
                self.regenerateEnergy();
            }, 1000);
        }
    }
});
