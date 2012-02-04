core.Class('r.controller.Gacha', {
    include: [ r.controller.Controller ],

    members: {
        indexAction: function() {
            return this.render('gacha_list');
        },

        doAction: function(args) {
            var ctxt = {
                rarity: r.util.Random.randInt(0, 2)
            };
            return this.render(ctxt);
        },

        resultAction: function(args) {
            return this.render();
        }
    }
});
