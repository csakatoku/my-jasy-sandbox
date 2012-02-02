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
                    return Deferred.next(function() {
                        return tmpl.render(params);
                    });
                }

                var templateString = __cache[cacheKey];
                if (templateString) {
                    return Deferred.next(function() {
                        var tmpl = __compiled[cacheKey] = Hogan.compile(templateString);
                        return tmpl.render(params);
                    });
                }

                var deferred = new Deferred();
                var path = 'asset/r/templates/' + templateName + '.html';
                core.io.Text.load(path, function(url, _, data) {
                    var tmpl = __compiled[cacheKey] = Hogan.compile(data.text);
                    __cache[cacheKey] = templateString;
                    deferred.call(tmpl.render(params));
                }, this, true); // TODO enable cache

                return deferred;
            }
        }
    });
}(this));
