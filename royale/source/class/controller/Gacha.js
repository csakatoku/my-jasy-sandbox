core.Class('r.controller.Gacha', {
    include: [ r.controller.Controller ],

    members: {
        indexAction: function() {
            return this.render('gacha_list');
        },

        doAction: function(args) {
            var gachaId = args.id || 0;
            var gacha = r.model.Gacha.get(gachaId);
            if (!gacha) {
                return this.redirect('gacha/index');
            }

            var crew = gacha.draw();
            return this.render({
                crew: crew
            });
        },

        resultAction: function(args) {
            var crewId = args.id || 0;
            var crew = r.model.Crew.get(crewId);
            if (!crew) {
                return this.redirect('gacha/index');
            }

            return this.render({
                crew: crew
            });
        }
    }
});
