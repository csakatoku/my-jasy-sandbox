/**
 * #asset(r/*)
 * #require(r.controller.Home)
 * #require(r.controller.Chapter)
 * #require(r.controller.Mission)
 * #require(r.controller.Gacha)
 * #require(r.controller.Crew)
 * #require(r.model.Chapter)
 * #require(r.model.Mission)
 * #require(r.model.Crew)
 * #require(r.model.Gacha)
 */
(function(globals, undef) {
    core.Class('r.App', {
        include: [ r.Observable ],

        construct: function() {
            this.__currentController = undefined;
            this.__configs = {};
            this.__preferences = {};
        },

        properties: {
            player: {
                type: 'object',
                init: null
            }
        },

        members: {
            getConfig: function(name) {
                return this.__configs[name] || [];
            },

            getPreference: function(key, _default) {
                if (this.__preferences[key] === undef) {
                    return _default;
                } else {
                    return this.__preferences[key];
                }
            },

            setPreference: function(key, value) {
                this.__preferences[key] = value;
            },

            getHistory: function() {
                return this.__history;
            },

            boot: function() {
                var self = this;
                var bootStarted = Date.now();

                var player = new r.model.Player();
                this.setPlayer(player);

                this.invoke('app.boot.start', bootStarted);

                this.__history = new r.history.PushStateBackend();
                this.__history.init();
                this.listen('route.change', this.run);

                var ids = [
                    'r/proto/chapters.json',
                    'r/proto/missions.json',
                    'r/proto/crews.json',
                    'r/proto/gacha.json'
                ];
                core.io.Asset.load(ids, function(assets) {
                    ids.forEach(function(id) {
                        var v, obj, klass;
                        if (assets[id] !== undef) {
                            v = assets[id];
                            obj = JSON.parse(v.text);
                            klass = core.Main.resolveNamespace(obj.class);
                            klass.init(obj.data);
                        }
                    });

                    this.invoke('app.boot.complete', Date.now());
                    this.run();
                },this, true); // TODO cache
            },

            run: function() {
                var args = {};
                var path = this.getHistory().getPath();

                if (path) {
                    // #!/controller/:action
                    var tmp = path.substr(3).split('/');
                    args._controller = tmp[0];
                    args._action = tmp[1] || 'index';
                    if (tmp.length >= 2) {
                        for (var i = 2; i < tmp.length; i += 2) {
                            var k = tmp[i];
                            var v = tmp[i + 1];
                            args[k] = v;
                        }
                    }
                } else {
                    args._controller = 'home';
                    args._action = 'index';
                }

                var action = r.util.String.snakeToCamel(args._action) + 'Action';
                var controllerName = r.util.String.snakeToPascal(args._controller);
                var klass = core.Main.resolveNamespace('r.controller.' + controllerName);
                var controller;
                if (this.__currentController === undef) {
                    this.__currentController = controller = new klass(this);
                } else {
                    if (this.__currentController.constructor.className === klass.className) {
                        controller = this.__currentController;
                    } else {
                        this.__currentController.unregister();
                        this.__currentController = controller = new klass(this);
                    }
                }
                controller.setContext(this);

                var f = controller[action];
                if (f) {
                    controller.setRoutingParameters(args);
                    f.call(controller, args);
                }
            }
        }
    });
}(this));
