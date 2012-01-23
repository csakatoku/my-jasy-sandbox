core.Class("sandwich.BLTSandwich", {
    include  : [ sandwich.Ingredients, sandwich.Calories ],
    implement: [ sandwich.Consumable ],

    construct: function() {
        this.setCalories(330);
        this.setIngredients(["Bacon", "Lettuce", "Tomato"]);
    },

    members: {
        consume: function(consumer) {
            console.log("Eating BLT Sandwich...");
        }
    }
});
