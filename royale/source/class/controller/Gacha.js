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

            var player = this.getContext().getPlayer();
            var crew = gacha.draw();
            player.addCrew(crew);

            return this.render({
                crew: crew
            });
        },

        doManyAction: function(args) {
            var gachaId = args.id || 0;
            var times = 10;
            var gacha = r.model.Gacha.get(gachaId);
            if (!gacha) {
                return this.redirect('gacha/index');
            }

            var player = this.getContext().getPlayer();
            var crew, crews = [];
            for (var i = 0; i < times; i++) {
                crew = gacha.draw();
                player.addCrew(crew);
                crews.push(crew);
            }

            return this.render({
                crews: crews,
                result: crews.map(function(x) { return x.id; }).join(',')
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
        },

        resultManyAction: function(args) {
            var ids = (args.ids || "").split(",");

            var crews = [];
            ids.forEach(function(id) {
                var crew = r.model.Crew.get(parseInt(id));
                if (crew) {
                    crews.push(crew);
                }
            });

            return this.render({
                crews: crews
            });
        }
    }
});
