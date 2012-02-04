core.Class('r.controller.Chapter', {
    include: [ r.controller.Controller ],

    construct: function(context) {
        this.__context = context;
    },

    members: {
        indexAction: function() {
            var player = this.__context.getPlayer();
            var chapters = [];
            r.model.Chapter
                .list()
                .filter(function(x) {
                    return !player.isLockedChapter(x);
                })
                .forEach(function(chapter) {
                    chapters.unshift({
                        'id'  : chapter.getId(),
                        'name': chapter.getName()
                    });
                });
            return this.render({
                'chapters': chapters
            });
        }
    }
});
