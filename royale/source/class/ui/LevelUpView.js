core.Class('r.ui.LevelUpView', {
    include: [ r.util.Template ],

    members: {
        render: function(params) {
            var self = this;
            var args = params || {};
            this.template('levelup', args, function(content) {
                var element = $(content);
                $("body").prepend(element);
                $("button[data-outlet-click]").bind("click", function() {
                    element.remove();
                });
            });
        }
    }
});
