(function(globals, undef) {
    var __list = [];
    var __map = {};

    core.Class('r.model.Mission', {
        construct: function(args) {
            for (var k in args) {
                if (args.hasOwnProperty(k)) {
                    this[k] = args[k];
                }
            }
        }
    });

    r.model.Mission.init = function(data) {
        data.forEach(function(proto) {
            var mission = new r.model.Mission(proto);
            var chapter = r.model.Chapter.get(mission.chapterId);
            chapter.getMissions().push(mission);
            __list.push(mission);
            __map[proto.id] = mission;
        });
    };

    r.model.Mission.get = function(id) {
        return __map[id];
    };

    r.model.Mission.list = function() {
        return __list;
    };
}(this));
