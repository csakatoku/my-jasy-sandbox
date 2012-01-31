/**
 * @require {$}
 */
(function(globals, undef) {
    var __cache = globals.sessionStorage;

    core.Class('r.controller.TemplateMixin', {
        members: {
            template: function(templateName, params, func) {
                var content;
                var tmpl = __cache[templateName];
                if (tmpl) {
                    content = Mustache.render(tmpl, params);
                    func.call(func, content);
                }

                var path = 'asset/r/templates/' + templateName + '.html';
                $.get(path, {
                    cache: false
                }).success(function(data) {
                    __cache[templateName] = data;
                    content = Mustache.render(data, params);
                    func.call(func, content);
                });
            }
        }
    });
}(this));
