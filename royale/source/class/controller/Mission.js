core.Class('r.controller.Mission', {
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
            // do nothing
        },

        initializeUI: function() {
            var self = this;
            $('[data-mission-do-job]').each(function(idx, el) {
                $(el).bind('click', function(evt) {
                    self.doJob(evt);
                });
            });

            this.__hud.init();
        },

        render: function() {
            var self = this;
            this.template("mission", {}, function(content) {
                $("#content").html(content);
                self.initializeUI();
            });
        },

        doJob: function(event) {
            var player = this.__context.getPlayer();
            var energy = player.getEnergy();
            if (energy > 0) {
                player.setEnergy(energy - 1);
                player.setXp(player.getXp() + 1);
                player.setCoins(player.getCoins() + 1);
            } else {
                $(event.target).attr('disabled', 'disabled');
            }
        }
    }
});
