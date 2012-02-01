/**
 * @require {$}
 */
(function(globals) {
    var __cache = {}; //globals.sessionStorage;

    core.Class('r.util.Template', {
        members: {
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
