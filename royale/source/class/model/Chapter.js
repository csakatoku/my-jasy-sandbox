(function(globals, undef) {
    var __chapters = {};
    var __chapterList = [];

    core.Class('r.model.Chapter', {
        construct: function(args) {
            this.setId(args.id);
            this.setName(args.name);
            this.setBegining(args.begining);
            this.setEnding(args.ending);
            this.setMissions(args.missions);
        },

        properties: {
            id: {
                type: 'integer'
            },
            name: {
                type: 'string'
            },

            begining: {
                type: 'string'
            },

            ending: {
                type: 'string'
            },

            missions: {
                type: 'array'
            }
        },

        members : {
            getMissionById: function(missionId) {
                var id = parseInt(missionId);
                var missions = this.getMissions();
                var mission;
                for (var i = 0; i < missions.length; i++) {
                    mission = missions[i];
                    if (mission.id === id) {
                        return mission;
                    }
                }
                return null;
            }
        }
    });

    r.model.Chapter.init = function(data) {
        data.forEach(function(proto) {
            var chapter = new r.model.Chapter({
                id      : proto.id,
                name    : proto.name,
                begining: proto.begining,
                ending  : proto.ending,
                missions: []
            });
            __chapters[proto.id] = chapter;
            __chapterList.push(chapter);
        });
    };

    r.model.Chapter.get = function(chapterId) {
        return __chapters[chapterId];
    };

    r.model.Chapter.list = function() {
        return __chapterList;
    };
}(this));
