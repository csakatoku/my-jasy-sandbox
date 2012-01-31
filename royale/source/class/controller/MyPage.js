core.Class('r.controller.MyPage', {
    include: [ r.Observable, r.controller.TemplateMixin ],

    construct: function(context) {
        this.__context = context;
        this.__hud = new r.ui.HUD(context);
    },

    members: {
        wakeup: function() {
            this.__hud.init();
        },

        sleep: function() {
        },

        indexAction: function() {
            this.template("my_page", {}, function(content) {
                $("#content").html(content);
            });
        }
    }
});
