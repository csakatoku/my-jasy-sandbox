core.Class('r.controller.Mission', {
    include: [ r.controller.Controller ],

    construct: function(context) {
        this.__context = context;
        this.__hud = new r.ui.HUD(context);
        this.listen('player.energy', this.onEnergyChanged);
        this.listen('player.level', this.onLevelUp);
        this.listen('player.missions.progress', this.onMissionProgressed);
        this.listen('player.missions.master', this.onMissionMastered);
    },

    members: {
        indexAction: function() {
            var player = this.__context.getPlayer();
            var chapter = player.getCurrentChapter();
            var missions = chapter.getMissions();
            var params = {
                chapter_name : chapter.getName(),
                missions: missions
            };
            return this.render("mission_list", params, function(self, args) {
                self.__hud.init();
                self.__currentMission = null;
            });
        },

        doAction: function(args) {
            var player = this.__context.getPlayer();
            var chapter = player.getCurrentChapter();
            var mission = chapter.getMissionById(args.id);
            if (mission == undefined) {
                return this.redirect('mission');
            }

            return this.render("mission", {
                mission: mission,
                mission_progress: player.getProgressById(mission.id)
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
                var coins = r.util.Random.randInt(mission.minCoins, mission.maxCoins);
                player.setEnergy(energy - mission.energy);
                player.setCoins(player.getCoins() + coins);
                player.addXp(mission.xp);
                player.progressMission(mission.id, 10);
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
        },

        onLevelUp: function(player) {
            this.presentModalView(new r.ui.LevelUpView());
        },

        onMissionMastered: function(value) {
            this.presentModalView(new r.ui.MissionMasterView());
            this.__context.getPlayer().refreshCurrentChapter();
        },

        onMissionProgressed: function(value) {
            $("#mission-progress-value").html(value + "/100");
        }
    }
});
