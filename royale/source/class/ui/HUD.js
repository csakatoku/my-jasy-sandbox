core.Class('r.ui.HUD', {
    include: [ r.Observable ],

    construct: function(context) {
        this.__context = context;
        this.listen('player.energy', this.onEnergyChanged);
        this.listen('player.xp', this.onXpChanged);
        this.listen('player.coins', this.onCoinsChanged);
    },

    members: {
        init: function() {
            var player = this.__context.getPlayer();
            this.onEnergyChanged(player);
            this.onXpChanged(player);
            this.onCoinsChanged(player);
        },

        onEnergyChanged: function(player) {
            $("#hud-energy").html(player.getEnergy());
        },

        onXpChanged: function(player) {
            $("#hud-xp").html(player.getXp());
        },

        onCoinsChanged: function(player) {
            $("#hud-coins").html(player.getCoins());
        }
    }
});
