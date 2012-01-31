core.Class('r.controller.Mission', {
    include: [ r.Observable, r.controller.TemplateMixin ],

    construct: function(context) {
        this.__context = context;
        this.__hud = new r.ui.HUD(context);
        this.__missions = [
                    {
                        id: 1,
                        name: 'Mission 1',
                        xp: 1,
                        energy: 1,
                        minCoins: 1,
                        maxCoins: 2
                    },
                    {
                        id: 2,
                        name: 'Mission 2',
                        xp: 2,
                        energy: 2,
                        minCoins: 3,
                        maxCoins: 4
                    },
                    {
                        id: 3,
                        name: 'Mission 3',
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

        sleep: function() {
            this.unregister();
        },

        indexAction: function() {
            var self = this;
            var params = {
                missions: this.__missions
            };
            this.template("mission_list", params, function(content) {
                $("#content").html(content);
                self.__hud.init();
                self.__currentMission = null;
            });
        },

        doAction: function(args) {
            var self = this;

            var id = parseInt(args.id || 1);
            var mission;
            this.__missions.forEach(function(m) {
                if (m.id === id) {
                    mission = m;
                }
            });

            this.template("mission", {
                mission: mission
            }, function(content) {
                $("#content").html(content);

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
                if (
                    elements.removeAttr('disabled');
                } else {
                    elements.attr('disabled', 'disabled');
                }
            }
        }
    }
});
