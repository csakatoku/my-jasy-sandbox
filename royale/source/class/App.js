(function(globals, undef) {
    core.Class('r.App', {
        properties: {
            player: {
                type: 'r.model.Player',
                init: null
            }
        },

        members: {
            boot: function() {
                var player = new r.model.Player();
                this.setPlayer(player);

                var controller = new r.controller.Mission(this);
                controller.run();
            }
        }
    });
}(this));
