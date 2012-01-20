(function(globals, undef) {
    var tr = core.locale.Translate.tr;
    var trc = core.locale.Translate.trc;
    var trn = core.locale.Translate.trn;

    core.Class('p.trans.App', {
        construct: function(settings) {
            this.__num = 0;
        },

        members: {
            init: function() {
                var msg = document.getElementById("msg");
                msg.innerHTML = "<p>" + trc("The message should not contain HTML", "How many spams do you want?") +"</p>";

                var num = document.getElementById("num");
                var self = this;
                document.getElementById("submit").addEventListener("click", function() {
                    var value = parseInt(num.value);
                    if (self.__num != value) {
                        self.__num = value;
                        self.onNumberChanged();
                    }
                }, false);

                this.onNumberChanged();

                console.log(core.Env.getValue("locale"));
            },

            onNumberChanged: function() {
                var status = document.getElementById("status");
                var text;
                if (this.__num) {
                    text = trn("You have a spam.", "You have %1 spams.", this.__num, this.__num);
                } else {
                    text = tr("You don't have spam.");
                }
                status.innerHTML = text;
            }
        }
    });
}(this));
