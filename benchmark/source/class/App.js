/**
 * @asset {benchmark/*}
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

        this.__hogan = null;
        this.__hamlCompiled = null;
        this.__hamlOptimized = null;
    },

    members: {
        boot: function() {
            var self  = this;
            var hogan = core.io.Asset.toUri('benchmark/templates/tmpl.mustache');
            var haml  = core.io.Asset.toUri('benchmark/templates/tmpl.haml');

            core.io.Text.load(hogan, function(uri, error, data) {
                self.__hogan = Hogan.compile(data.text);

                document.getElementById('hogan').addEventListener('click', function() {
                    self.benchmark('hogan.js', function(params) {
                        return self.__hogan.render(params);
                    });
                }, false);
            }, this, true);

            core.io.Text.load(haml, function(uri, error, data) {
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
        },

        benchmark: function(name, func) {
            var tmpl = this.__hogan;
            var data = this.__data;
            var content, i;
            if (tmpl === null) {
                return;
            }

            var start = Date.now();
            var times = 10000;
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
