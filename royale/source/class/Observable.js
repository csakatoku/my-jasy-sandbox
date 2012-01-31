(function(globals, undef) {
    var listeners = {};
    var dispatcher;

    core.Class('r.Observable', {
        members: {
            invoke: function(type, data) {
                var objs = listeners[type] || [];
                objs.forEach(function(obj) {
                    obj.call(obj, data);
                });
            },

            listen: function(type, func) {
                var seq = listeners[type] || [];
                seq.push(func);
                listeners[type] = seq;
            }
        }
    });
}(this));
