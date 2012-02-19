/**
 * @require {$}
 */
(function(globals, undef) {

    core.Class('r.controller.Controller', {
        include: [ r.Observable, r.util.Template ],

        properties: {
            context: {
                type: 'object'
            },

            routingParameters: {
                type: 'object',
                init: {}
            }
        },

        members: {
            redirect: function(route, params) {
                var tmp = [];
                var next = '#!/' + route;
                params = params || {};
                for (var k in params) {
                    if (params.hasOwnProperty(k)) {
                        tmp.push(k);
                        tmp.push(params[k] || 0);
                    }
                }
                if (tmp.length) {
                    next += '/' + (tmp.join('/'));
                }

                this.getContext().getHistory().push(next);
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
