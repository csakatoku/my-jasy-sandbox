core.Class('sandwich.App', {
    members : {
        init: function() {
            var click = function(id, func) {
                var el = document.getElementById(id);
                if (el) {
                    el.addEventListener("click", function(e) {
                        func.call(e);
                    }, false);
                }
            };

            var blt = new sandwich.BLTSandwich();
            var turkey = new sandwich.TurkeySwissSandwich();

            click("calBLT", function() {
                alert(blt.getCalories());
            });

            click("ingBLT", function() {
                alert(blt.getIngredients().join(","));
            });

            click("calTurkey", function() {
                alert(turkey.getCalories());
            });

            click("ingTurkey", function() {
                alert(turkey.getIngredients().join(","));
            });
        }
    }
});
