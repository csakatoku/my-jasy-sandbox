core.Class('r.history.HashChangeBackend', {
    include: [ r.Observable ],

    members: {
        init: function() {
            var self = this;
            window.addEventListener('hashchange', function(e) {
                self.__handleChange.call(self, e);
            }, false);
        },

        getPath: function() {
            return location.hash;
        },

        push: function(path) {
            location.hash = path;
        },

        replace: function(path) {
            location.replace(path);
        },

        __handleChange: function(e) {
            this.invoke('route.change', this.getPath());
        }
    }
});
