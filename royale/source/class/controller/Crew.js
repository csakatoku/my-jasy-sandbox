(function(globals, undef) {
    core.Class('r.controller.Crew', {
        include: [ r.controller.Controller ],

        construct: function(context) {
            this.__context = context;
            this.__sell = {};
            this.__merge = {};
        },

        members: {
            getMergeBaseId: function() {
                return this.__context.getPreference('controller.crew.merge_base_id', 0);
            },

            setMergeBaseId: function(value) {
                this.__context.setPreference('controller.crew.merge_base_id', value);
            },

            indexAction: function(args) {
                var crews = this.__getCrews();
                return this.render({
                    crews: crews
                }).next(function(self) {
                    $('[data-outlet]').each(function(idx, el) {
                        var crewId = el.getAttribute('data-outlet');
                        $(el).bind('click', function() {
                            self.redirect('crew/show', { id: crewId });
                            return false;
                        });
                    });
                });
            },

            showAction: function(args) {
                var crews = this.__getCrews();
                return this.render({
                    crew: crews[0]
                });
            },

            mergeAction: function(args) {
                var baseId = this.getMergeBaseId();
                if (baseId < 1) {
                    return this.redirect('crew/merge_select');
                }

                var self = this;
                var base = null;
                var crews = [];
                this.__getCrews().forEach(function(crew) {
                    if (baseId == crew.id) {
                        base = crew;
                    } else {
                        crews.push(crew);
                    }
                });
                return this.render({
                    base : base,
                    crews: crews
                }).next(function(self) {
                    $('[data-outlet]').each(function(idx, el) {
                        var crewId = el.getAttribute('data-outlet');
                        var checkbox = $('input#crew_' + crewId).get(0);
                        $(el).bind('click', function() {
                            self.__merge[crewId] = checkbox.checked = !checkbox.checked;
                        });
                    });
                });
            },

            mergeSelectAction: function(args) {
                var crews = this.__getCrews();
                return this.render({
                    crews: crews
                });
            },

            mergeSelectDoneAction: function(args) {
                this.setMergeBaseId(args.id);
                return this.redirect('crew/merge');
            },

            sellAction: function(args) {
                var crews = this.__getCrews();
                return this.render({
                    crews: crews
                }).next(function(self) {
                    $('[data-outlet]').each(function(idx, el) {
                        var crewId = el.getAttribute('data-outlet');
                        var checkbox = $('input#crew_' + crewId).get(0);
                        $(el).bind('click', function() {
                            self.__sell[crewId] = checkbox.checked = !checkbox.checked;
                        });
                    });
                });
            },

            sellConfirmAction: function(args) {
                var selected = [];
                var sell = this.__sell;
                Object.keys(sell).forEach(function(id) {
                    if (sell[id]) {
                        selected.push(id);
                    }
                });
                return this.render({
                    'crews': selected
                }).next(function(self) {
                    $('a[data-outlet]').bind('click', function(e) {
                        self.redirect('crew/sell');
                        return false;
                    });
                });
            },

            __getCrews: function() {
                var player = this.__context.getPlayer();
                var crews = [
                    {
                        id: 1,
                        level: 19,
                        name: 'Crew 1',
                        attack: 99,
                        defence: 1001
                    },
                    {
                        id: 2,
                        name: 'Crew 2',
                        level: 34,
                        attack: 3289,
                        defence: 1001
                    },
                    {
                        id: 3,
                        name: 'Crew 3',
                        level: 23,
                        attack: 10002,
                        defence: 1001
                    }
                ];
                return crews;
            }
        }
    });
}(this));
