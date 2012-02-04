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

    r.model.Mission.init = function(context) {
        context.getConfig('missions').forEach(function(proto) {
            var mission = new r.model.Mission(proto);
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
