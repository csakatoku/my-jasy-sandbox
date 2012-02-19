core.Class('r.history.PushStateBackend', {
    include: [ r.Observable ],

    construct: function() {
        this.__firstTime = true;
    },

    members: {
        init: function() {
            var self = this;
            window.addEventListener('popstate', function(e) {
                self.__handleChange.call(self, e);
            }, false);
        },

        getPath: function() {
            return location.hash;
        },

        push: function(path) {
            history.pushState(null, null, path);
            this.invoke('route.change', this.getPath());
        },

        replace: function(path) {
            history.replaceState(null, null, path);
            this.invoke('route.change', this.getPath());
        },

        __handleChange: function(e) {
            if (this.__firstTime !== true) {
                this.invoke('route.change', this.getPath());
            }
            this.__firstTime = false;
        }
    }
});
