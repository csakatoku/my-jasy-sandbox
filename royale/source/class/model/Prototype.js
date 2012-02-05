(function(globals, undef) {
    core.Class('r.model.Prototype', {
        members: {
            init: function(args) {
                for (var k in args) {
                    if (args.hasOwnProperty(k)) {
                        this[k] = args[k];
                    }
                }
            }
        }
    });

    r.model.Prototype.expose = function(cls, factory) {
        var _list = [];
        var _map = {};

        factory = factory || function(args) {
            return new cls(args);
        };

        cls.init = function(data) {
            data.forEach(function(args) {
                var instance = factory(args);
                _list.push(instance);
                _map[args.id] = instance;
            });
        };

        cls.get = function(id) {
            return _map[id];
        };

        cls.list = function() {
            return _list;
        };
    };
}(this));
