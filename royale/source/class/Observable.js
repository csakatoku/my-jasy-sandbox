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

            unregister: function() {
                for (var key in listeners) {
                    if (listeners.hasOwnProperty(key)) {
                        var seq = listeners[key];
                        var index = -1;
                        for (var i = 0; i < seq.length; i++) {
                            var pair = seq[i];
                            var scope = pair[1];
                            if (scope === this) {
                                index = i;
                                break;
                            }
                        }

                        if (index >= 0) {
                            seq.splice(index, 1);
                        }
                    }
                }
            }
        }
    });
}(this));
