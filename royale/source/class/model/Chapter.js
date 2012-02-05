(function(globals, undef) {

    core.Class('r.model.Chapter', {
        construct: function(args) {
            this.id = args.id;
            this.setId(args.id);
            this.setName(args.name);
            this.setBegining(args.begining);
            this.setEnding(args.ending);
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
                type: 'array',
                init: []
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

    r.model.Prototype.expose(r.model.Chapter);
}(this));
