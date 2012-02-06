(function(globals, undef) {

    core.Class('r.model.Crew', {
        include: [ r.model.Prototype ],

        construct: function(args) {
            this.init(args);
        }
    });

    r.model.Prototype.expose(r.model.Crew);
}(this));
