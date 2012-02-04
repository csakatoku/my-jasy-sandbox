core.Class('r.controller.Chapter', {
    include: [ r.controller.Controller ],

    members: {
        indexAction: function() {
            var chapters = [];
            r.model.Chapter.list().forEach(function(chapter) {
                chapters.push({
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
