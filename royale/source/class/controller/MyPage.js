core.Class('r.controller.MyPage', {
    include: [ r.controller.Controller ],

    construct: function(context) {
        this.__context = context;
        this.__hud = new r.ui.HUD(context);
    },

    members: {
        wakeup: function() {
            this.__hud.init();
        },

        indexAction: function() {
            return this.render('my_page');
        }
    }
});
