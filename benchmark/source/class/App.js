/**
 * #asset(benchmark/*)
 */
"use strict";
core.Class('benchmark.App', {
    construct: function() {
        var seq = [];
        for (var i = 1; i <= 10; i++) {
            var name = 'name ' + i;
            var content = 'Can you help me by sending ' + (i + 1) + ' spams?';
            seq.push({
                name     : name,
                content  : content
            });
        }
        this.__data = { 'messages': seq };
    },

    members: {
        boot: function() {
            var self  = this;
            var hogan = core.io.Asset.toUri('benchmark/templates/tmpl.mustache');
            var _whiskers = core.io.Asset.toUri('benchmark/templates/tmpl.whiskers');
            var _jade  = core.io.Asset.toUri('benchmark/templates/tmpl.jade');
            var haml  = core.io.Asset.toUri('benchmark/templates/tmpl.haml');
            var _swig = core.io.Asset.toUri('benchmark/templates/tmpl.twig');
            var jsrender = core.io.Asset.toUri('benchmark/templates/tmpl.jsrender.html');

            core.io.Text.load(hogan, function(uri, error, data) {
                document.getElementById('hogan').addEventListener('click', function() {
                    var tmpl = Hogan.compile(data.text);
                    self.benchmark('hogan.js', function(params) {
                        return tmpl.render(params);
                    });
                }, false);
            }, this, true);

            core.io.Text.load(_whiskers, function(uri, error, data) {
                document.getElementById('whiskers').addEventListener('click', function() {
                    var tmpl = whiskers.compile(data.text);
                    self.benchmark('whiskers.js', function(params) {
                        return whiskers.render(tmpl, params, '');
                    });
                }, false);
            }, this, true);

            core.io.Text.load(_jade, function(uri, error, data) {
                document.getElementById('jade-compiled').addEventListener('click', function() {
                    var tmpl = jade.compile(data.text, { filename: "jade", compileDebug: false });
                    self.benchmark('jade.js compiled', function(params) {
                        return tmpl(params);
                    });
                }, false);
            }, this, true);

            core.io.Text.load(haml, function(uri, error, data) {
                Haml('', { escapeHtmlByDefault: true });

                document.getElementById('haml-compiled').addEventListener('click', function() {
                    var tmpl = Haml.compile(data.text);
                    self.benchmark('haml.js compiled', function(params) {
                        return Haml.execute(tmpl, self, params);
                    });
                }, false);

                document.getElementById('haml-optimized').addEventListener('click', function() {
                    var tmpl = Haml.optimize(Haml.compile(data.text));
                    self.benchmark('haml.js optimized', function(params) {
                        return Haml.execute(tmpl, self, params);
                    });
                }, false);
            }, this, true);

            core.io.Text.load(_swig, function(uri, error, data) {
                var tmpl = swig.compile(data.text, { filname: 'inbox' });
                document.getElementById('swig').addEventListener('click', function() {
                    self.benchmark('swig.js', function(params) {
                        return tmpl(params);
                    });
                }, false);
            }, this, true);

            core.io.Text.load(jsrender, function(uri, error, data) {
                var tmpl = $.template('inbox', data.text);
                document.getElementById('jsrender').addEventListener('click', function() {
                    self.benchmark('jsrender', function(params) {
                        return $.render(params, 'inbox');
                    });
                }, false);
            }, this, true);
        },

        benchmark: function(name, func) {
            var data = this.__data;
            var start = Date.now();
            var times = 10000;
            var i;
            for (i = 0; i < times; i++) {
                content = func(data);
            }
            var elapsed = Date.now() - start;
            var el = document.createElement('div');
            el.innerHTML = (name + ': ' + elapsed + ' ms' + ' ' + times + ' times');
            document.getElementById('result').appendChild(el);
            document.getElementById('content').innerHTML = content;
        }
    }
});
