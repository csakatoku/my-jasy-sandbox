core.Class('r.controller.Home', {
    include: [ r.controller.Controller ],

    construct: function(context) {
        this.__context = context;
        this.__hud = new r.ui.HUD(context);
        this.__hud.init();
    },

    members: {
        indexAction: function() {
            return this.render();
        }
    }
});
