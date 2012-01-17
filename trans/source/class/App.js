core.Class('p.trans.App', {
    construct: function(settings) {
        var tr = core.locale.Translate.tr;
        var list = document.createElement("ul");
        var data = [tr("Spam"), tr("Egg"), tr("Ham")];
        data.forEach(function(text) {
            var element = document.createElement("li");
            element.innerHTML = text;
            list.appendChild(element);
        });
        document.getElementById("content").appendChild(list);

        if (core.Env.isSet("debug")) {
            console.log(core.Env.getValue("locale"));
        }
    }
});
