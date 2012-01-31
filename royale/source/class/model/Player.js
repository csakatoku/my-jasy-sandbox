core.Class('r.model.Player', {
    include: [ r.Observable ],

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

        xp: {
            type: 'integer',
            init: 0,
            apply: function(value) {
                this.invoke('player.xp', this);
            }
        }
    }
});
