core.Class('r.controller.MyPage', {
    include: [ r.Observable, r.controller.TemplateMixin ],

    construct: function(context) {
        this.__context = context;
        this.__hud = new r.ui.HUD(context);
    },

    members: {
        run: function() {
            this.initialize();
            this.render();
        },

        initialize: function() {
            this.__hud.init();
        },

        render: function() {
            this.template("my_page", {}, function(content) {
                $("#content").html(content);
            });
        }
    }
});
