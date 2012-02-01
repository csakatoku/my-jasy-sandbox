core.Class('r.model.Player', {
    include: [ r.Observable ],

    construct: function() {
        this.listen('app.boot.complete', this.onGameBooted);
    },

    properties: {
        coins: {
            type: 'integer',
            init: 100,
            apply: function(value) {
                this.invoke('player.coins', this);
            }
        },

        energy: {
            type: 'integer',
            init: 10,
            apply: function(value) {
                this.invoke('player.energy', this);
            }
        },

        maxEnergy: {
            type: 'integer',
            init: 10,
            apply: function(value) {
                this.invoke('player.max_energy', this);
            }
        },

        xp: {
            type: 'integer',
            init: 0,
            apply: function(value) {
                this.invoke('player.xp', this);
            }
        },

        level: {
            type: 'integer',
            init: 1,
            apply: function(value) {
                this.invoke('player.level', this);
            }
        },

        missions: {
            type: "Object",
            init: {}
        }
    },

    members : {
        addXp: function(delta) {
            var level = this.getLevel();
            var xp = this.getXp() + delta;
            this.setXp(xp);

            if (xp >= (level * 20)) {
                this.__lastEnergyGenerated = Date.now();
                this.setMaxEnergy(this.getMaxEnergy() + 1);
                this.setEnergy(this.getMaxEnergy());
                this.setLevel(level + 1);
            }
        },

        regenerateEnergy: function() {
            var now = Date.now();
            var delta = now - this.__lastEnergyGenerated;
            var period = 10 * 1000;
            if (delta > period) {
                var generated = Math.floor(delta / period);
                var energy = Math.min(this.getEnergy() + generated, this.getMaxEnergy());
                this.setEnergy(energy);
                this.__lastEnergyGenerated = now;
                if (core.Env.isSet('debug')) {
                    console.log("energy regenerated");
                }
            }
        },

        getProgressById: function(missionId) {
            var m = this.getMissions();
            var current = m[missionId] || 0;
            return current > 100 ? 100 : current;
        },

        progressMission: function(missionId, delta) {
            var m = this.getMissions();
            var current = m[missionId] || 0;
            var next = (current + delta) > 100 ? 100 : current + delta;
            m[missionId] = next;
            this.invoke('player.missions.progress', next);
            if (current !==next && next === 100) {
                this.invoke('player.missions.master', missionId);
            }
            return next;
        },

        isCompletedChapter: function(chapter) {
            var self = this;
            return chapter.getMissions().every(function(mission) {
                var progress = self.getProgressById(mission.id);
                return progress >= 100;
            });
        },

        refreshCurrentChapter: function() {
            var chapters = r.model.Chapter.list();
            var chapter = chapters[0], next;
            for (var i = 0, length = chapters.length; i < length; i++) {
                next = chapters[i];
                if (!this.isCompletedChapter(chapter)) {
                    break;
                }
                chapter = next;
            }
            this.__currentChapter = chapter;
        },

        getCurrentChapter: function() {
            return this.__currentChapter;
        },

        onGameBooted: function() {
            var self = this;
            this.__lastEnergyGenerated = Date.now();
            this.__interval = setInterval(function() {
                self.regenerateEnergy();
            }, 1000);

            this.refreshCurrentChapter();

            this.unregister('app.boot.complete');
        }
    }
});
