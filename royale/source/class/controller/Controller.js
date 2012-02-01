/**
 * @require {$}
 */
(function(globals, undef) {

    core.Class('r.controller.Controller', {
        include: [ r.Observable, r.util.Template ],

        members: {
            wakeup: function() {
                //
            },

            sleep: function() {
                this.unregister();
            },

            redirect: function(route, params) {
                var args = params || {};
                return {
                    'route': route,
                    'args' : args
                };
            },

            render: function(templateName, params, postRendered) {
                var self = this;
                var args = params || {};
                this.template(templateName, args, function(content) {
                    $("#content").html(content);
                    if (postRendered) {
                        postRendered.apply(self, [self, args]);
                    }
                });
                return null;
            },

            presentModalView: function(view, element) {
                view.render();
            }
        }
    });
}(this));
