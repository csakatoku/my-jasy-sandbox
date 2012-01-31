core.Class('r.controller.Mission', {
    include: [ r.controller.Controller ],

    construct: function(context) {
        this.__context = context;
        this.__hud = new r.ui.HUD(context);
        this.__missions = [
                    {
                        id: 1,
                        name: 'Mission 1',
                        description: '中二病的な説明がここに入ります',
                        xp: 1,
                        energy: 1,
                        minCoins: 1,
                        maxCoins: 2
                    },
                    {
                        id: 2,
                        name: 'Mission 2',
                        description: '192.168.56.101',
                        xp: 2,
                        energy: 2,
                        minCoins: 3,
                        maxCoins: 4
                    },
                    {
                        id: 3,
                        name: 'Mission 3',
                        description: '<span>descripton</span>',
                        xp: 3,
                        energy: 3,
                        minCoins: 4,
                        maxCoins: 8
                    }
        ];
    },

    members: {
        wakeup: function() {
            this.listen('player.energy', this.onEnergyChanged);
        },

        indexAction: function() {
            var params = {
                missions: this.__missions
            };
            return this.render("mission_list", params, function(self, args) {
                self.__hud.init();
                self.__currentMission = null;
            });
        },

        doAction: function(args) {
            var id = parseInt(args.id || 1);
            var mission;
            this.__missions.forEach(function(m) {
                if (m.id === id) {
                    mission = m;
                }
            });

            if (mission == undefined) {
                return this.redirect('mission/do');
            }

            return this.render("mission", {
                mission: mission
            }, function(self, args) {
                $('[data-mission-do-job]').each(function(idx, el) {
                    $(el).bind('click', function(evt) {
                        self.doJob(mission);
                    });
                });
                self.__hud.init();
                self.__currentMission = mission;
            });
        },

        doJob: function(mission) {
            var player = this.__context.getPlayer();
            var energy = player.getEnergy();
            if (energy >= mission.energy) {
                player.setEnergy(energy - mission.energy);
                player.setXp(player.getXp() + mission.xp);
                player.setCoins(player.getCoins() + mission.minCoins);
            }
        },

        onEnergyChanged: function(player) {
            if (this.__currentMission) {
                var energy = player.getEnergy();
                var elements = $('[data-mission-do-job]');
                if (energy >= this.__currentMission.energy) {
                    elements.removeAttr('disabled');
                } else {
                    elements.attr('disabled', 'disabled');
                }
            }
        }
    }
});
