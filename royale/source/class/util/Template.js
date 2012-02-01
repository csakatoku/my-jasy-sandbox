/**
 * @require {$}
 */
(function(globals) {
    var __cache = {}; //globals.sessionStorage;
    var __compiled = {};

    core.Class('r.util.Template', {
        members: {
            template: function(templateName, params, func) {
                var content;
                var cacheKey = '_template_' + templateName;
                var tmpl = __compiled[cacheKey];
                if (tmpl) {
                    content = tmpl.render(params);
                    func.call(this, content);
                    return;
                }

                var templateString = __cache[cacheKey];
                if (templateString) {
                    __compiled[cacheKey] = tmpl = Hogan.compile(templateString);
                    content = tmpl.render(params);
                    func.call(this, content);
                    return;
                }

                var path = 'asset/r/templates/' + templateName + '.html';
                $.ajax({
                    url    : path,
                    cache  : false,
                    success:  function(templateString) {
                        __cache[cacheKey] = templateString;
                        __compiled[cacheKey] = tmpl = Hogan.compile(templateString);
                        content = tmpl.render(params);
                        func.call(this, content);
                    }
                });
            }
        }
    });
}(this));
