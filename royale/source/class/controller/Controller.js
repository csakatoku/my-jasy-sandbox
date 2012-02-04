/**
 * @require {$}
 */
(function(globals, undef) {

    core.Class('r.controller.Controller', {
        include: [ r.Observable, r.util.Template ],

        properties: {
            routingParameters: {
                type: 'object',
                init: {}
            }
        },

        members: {
            redirect: function(route, params) {
                var args = params || {};
                return {
                    'route': route,
                    'args' : args
                };
            },

            render: function(params, templateName) {
                var controller = this;
                var args = params || {};
                if (templateName === undef) {
                    var r = this.getRoutingParameters();
                    templateName = r._controller + '/' + r._action;
                }
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
