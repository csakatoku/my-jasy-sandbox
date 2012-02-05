(function(globals, undef) {
    core.Class('r.model.Mission', {
        include: [ r.model.Prototype ],

        construct: function(args) {
            this.init(args);
        }
    });

    r.model.Prototype.expose(r.model.Mission, function(proto) {
        var mission = new r.model.Mission(proto);
        var chapter = r.model.Chapter.get(mission.chapterId);
        chapter.getMissions().push(mission);
        return mission;
    });
}(this));
