/**
 * @asset {r/*}
 */
(function(globals, undef) {
    var controllers = {};

    var classes = {
        'default': r.controller.MyPage,
        'mission': r.controller.Mission
    };

    core.Class('r.App', {
        include: [ r.Observable ],

        construct: function() {
            this.__currentController = null;
        },

        properties: {
            player: {
                type: 'r.model.Player',
                init: null
            }
        },

        members: {
            boot: function() {
                var self = this;
                var player = new r.model.Player();
                this.setPlayer(player);

                var run = function() {
                    var controllerName, actionName;
                    var args = {};
                    if (location.hash) {
                        // #!/controller/:action
                        var tmp = location.hash.substr(3).split('/');
                        controllerName = tmp[0];
                        actionName = tmp[1] || 'index';
                        if (tmp.length >= 2) {
                            for (var i = 2; i < tmp.length; i += 2) {
                                var k = tmp[i];
                                var v = tmp[i + 1];
                                args[k] = v;
                            }
                        }
                    } else {
                        controllerName = 'default';
                        actionName = 'index';
                    }

                    var action = actionName + 'Action';
                    var controller = controllers[controllerName];
                    if (controller === undefined) {
                        controller = new classes[controllerName](self);
                        controllers[controllerName] = controller;
                    }

                    var changed = (this.__currentController === undefined);
                    if (self.__currentController && self.__currentController !== controller) {
                        self.__currentController.sleep();
                        changed = true;
                    }

                    self.__currentController = controller;

                    if (changed) {
                        controller.wakeup();
                    }

                    var response = controller[action].call(controller, args);
                    if (response && response.route) {
                        // TODO
                        var args = response.args;
                        var tmp = [];
                        for (var k in args) {
                            if (args.hasOwnProperty(k)) {
                                tmp.push(k);
                                tmp.push(args[k] || 0);
                            }
                        }
                        var next = '#!/' + response.route + '/' + (tmp.join('/'));
                        console.log([next, response]);
                        location.hash = next;
                        run();
                    }
                };

                $(window).bind('hashchange', run);
                run();

                this.invoke('app.boot');
            }
        }
    });
}(this));
