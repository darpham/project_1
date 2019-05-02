dom_manipulation = {
    // Nested forEach functions to create divs with appropiate styling for each restaurant
    addSuggestions : function(businesses) {

        var businessArr = [];
        var businessObj = [];
        businesses.some(function(business) {
            if(!businessArr.includes(business.name)) {
                businessObj.push(business);
                businessArr.push(business.name)
            }
            return businessObj.length === 6;
        });

        businessObj.forEach(function(business) {
            var suggestion = $('<div>');
            suggestion.addClass('col-md-4 suggested');
            suggestion.append('<img class="imgportf suggested-rest" restaurant="' +business.name+ '" src="' +business.image_url+ '" />');
            suggestion.append('<h5 class="suggested-rest" restaurant="' +business.name+ '" >' +business.name+ '</h5>');
            $('#suggestions').append(suggestion);
        });

        // hides loading image and unhides suggestion divs once all suggestions are loadded above
        $('#loading').addClass('hidden');
        $('#suggestions').removeClass('hidden');
    },

    // function to create and append recipes onto the result.html
    addRecipes : function(recipes) {

        // splice to remove unnecessary amount of restaurants (6-19)
        recipes.splice(6,4);
        console.log(recipes)

        recipes.forEach(function(recipe) {
            var suggestion = $('<div>');
            suggestion.addClass('col-md-4 results');
            suggestion.append('<img class="imgportf recipe" src="' +recipe.recipe.image+ '" />');
            suggestion.append('<h5 class="recipe" >' +recipe.recipe.label+ '</h5>');
            $('#suggested-recipes').append(suggestion);
        });

        // hides loading image and unhides suggestion divs once all suggestions are loadded above
        $('#loading').addClass('hidden');
        $('#suggested-recipes').removeClass('hidden');
    }
}; 