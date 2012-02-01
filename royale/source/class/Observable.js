(function(globals, undef) {
    var listeners = {};
    var dispatcher;

    core.Class('r.Observable', {
        members: {
            invoke: function(type, data) {
                var objs = listeners[type] || [];
                objs.forEach(function(pair) {
                    var func = pair[0];
                    var scope = pair[1];
                    func.call(scope, data);
                });
            },

            listen: function(type, func, scope) {
                var self = scope || this;
                var seq = listeners[type] || [];
                seq.push([func, self]);
                listeners[type] = seq;
            },

            unregister: function(name) {
                if (name) {
                    return this.__unregisterByType(name) ? [name] : [];
                } else {
                    var types = [];
                    var self = this;
                    Object.keys(listeners).map(function(key) {
                        if (self.__unregisterByType(key)) {
                            types.push(key);
                        }
                    });
                    return types;
                }
            },

            __unregisterByType: function(type) {
                var seq = listeners[type];
                var index = -1;
                for (var i = 0, length = seq.length; i < length; i++) {
                    var pair = seq[i];
                    var scope = pair[1];
                    if (scope === this) {
                        index = i;
                        break;
                    }
                }

                if (index >= 0) {
                    seq.splice(index, 1);
                    return true;
                }

                return false;
            }
        }
    });
}(this));
