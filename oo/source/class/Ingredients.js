core.Class("sandwich.Ingredients", {
    properties: {
        ingredients: {
            type    : "array",
            nullable: false,
            apply: function(value) {
                if (core.Env.isSet("debug")) {
                    console.log("set new ingredients = " + (value.join(",")));
                }
            }
        }
    }
});
