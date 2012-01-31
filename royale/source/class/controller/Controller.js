/**
 * @require {$}
 */
(function(globals, undef) {
    var __cache = {}; //globals.sessionStorage;

    core.Class('r.controller.Controller', {
        include: [ r.Observable ],

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

            template: function(templateName, params, func) {
                var content;
                var cacheKey = '_template_' + templateName;
                var tmpl = __cache[cacheKey];
                if (tmpl) {
                    content = Mustache.render(tmpl, params);
                    func.call(func, content);
                    return;
                }

                var path = 'asset/r/templates/' + templateName + '.html';
                $.ajax({
                    url    : path,
                    cache  : false,
                    success:  function(data) {
                        __cache[cacheKey] = data;
                        content = Mustache.render(data, params);
                        func.call(func, content);
                    }
                });
            }
        }
    });
}(this));
