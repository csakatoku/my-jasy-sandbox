core.Class("sandwich.Calories", {
    properties: {
        calories: {
            type    : "number",
            nullable: false,
            apply: function(value) {
                if (core.Env.isSet("debug")) {
                    console.log("set new calories = " + value);
                }
            }
        }
    }
});
