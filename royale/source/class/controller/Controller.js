/**
 * @require {$}
 */
(function(globals, undef) {

    core.Class('r.controller.Controller', {
        include: [ r.Observable, r.util.Template ],

        members: {
            redirect: function(route, params) {
                var args = params || {};
                return {
                    'route': route,
                    'args' : args
                };
            },

            render: function(templateName, params, postRendered) {
                var controller = this;
                var args = params || {};
                return this.template(templateName, args).next(function(content) {
                    $("#content").html(content);
                    return controller;
                });
            },

            presentModalView: function(view, element) {
                view.render();
            }
        }
    });
}(this));
