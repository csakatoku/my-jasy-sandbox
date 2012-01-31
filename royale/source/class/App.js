/**
 * @asset {r/*}
 */
(function(globals, undef) {
    var controllers = {};

    var classes = {
        'default': r.controller.MyPage,
        'mission': r.controller.Mission
    };

    core.Class('r.App', {
        properties: {
            player: {
                type: 'r.model.Player',
                init: null
            }
        },

        members: {
            boot: function() {
                var self = this;
                var player = new r.model.Player();
                this.setPlayer(player);

                $(window).bind('hashchange', function() {
                    self.getController().run();
                });
                self.getController().run();
            },

            getController: function() {
                var name = location.hash ? location.hash.substr(1) : "default";
                var controller = controllers[name];
                if (controller === undef) {
                    controller = new classes[name](this);
                    controllers[name] = controller;
                }
                return controller;
            }
        }
    });
}(this));
