core.Class('r.ui.MissionMasterView', {
    include: [ r.util.Template ],

    members: {
        render: function(params) {
            var self = this;
            var args = params || {};
            this.template('mission_master', args, function(content) {
                var element = $(content);
                $("body").prepend(element);
                $("button[data-outlet-click]").bind("click", function() {
                    element.remove();
                });
            });
        }
    }
});
