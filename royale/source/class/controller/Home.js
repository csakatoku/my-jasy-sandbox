core.Class('r.controller.Home', {
    include: [ r.controller.Controller ],

    construct: function(context) {
        this.__context = context;
        this.__hud = new r.ui.HUD(context);
        this.__hud.init();
    },

    members: {
        indexAction: function() {
            var player = this.__context.getPlayer();
            var mission = player.getCurrentMission();
            return this.render({
                player : player,
                mission: mission
            });
        }
    }
});
