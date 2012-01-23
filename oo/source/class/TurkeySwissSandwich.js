core.Class("sandwich.TurkeySwissSandwich", {
    include  : [ sandwich.Ingredients, sandwich.Calories ],
    implement: [ sandwich.Consumable ],

    construct: function() {
        this.setCalories(450);
        this.setIngredients(["Terkey", "Swiss"]);
    },

    members: {
        consume: function(consumer) {
            console.log("Eating Turkey Swiss Sandwich...");
        }
    }
});
