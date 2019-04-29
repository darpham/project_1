// File to grab inputs the user's preferences
// This JS only interacts with result.html and will update the inputs variables needed for the api_calls.js

// Listener to add ingredients the user wants to include the the recipe
$("#add-ingredient").on("click", function(event) {

    var ingredient = $("#ingredient-to-add").val().trim();

    if (ingredient == "") {
        console.error("no ingredient specified");
    } else {

        ingredientsArr.push(ingredient);

        var foodItem = $("<p>");

        foodItem.attr("id", ingredient);
        foodItem.text(ingredient);
    
        var foodDelete = $("<button>");
    
        foodDelete.attr("ingredient", ingredient);
        foodDelete.addClass('delete');
        foodDelete.text("x");
        
        foodItem = foodItem.prepend(foodDelete);
    
        $("#include-ingredients").append(foodItem);
    
        $("#ingredient-to-add").val("");
    };

});

// Listener to exclude ingredients the user doesn't want in the recipe
$("#ex-ingredient").on("click", function(event) {

    var ingredient = $("#ingredient-to-exclude").val().trim();

    if (ingredient == "") {
        console.error("no ingredient specified");
    } else {

        excludeArr.push(ingredient);

        var foodItem = $("<p>");

        foodItem.attr("id", ingredient);
        foodItem.text(ingredient);
    
        var foodDelete = $("<button>");
    
        foodDelete.attr("ingredient", ingredient);
        foodDelete.addClass('delete');
        foodDelete.text("x");
        
        foodItem = foodItem.prepend(foodDelete);
    
        $("#exclude-ingredients").append(foodItem);
    
        $("#ingredient-to-exclude").val("");
    };

});

// Listener to delete ingredients the user filtered
$(document.body).on("click", ".delete", function() {

    var ingredient = $(this).attr("ingredient");

    var parent = $(this).parent().attr("id");

    $(this).closest('p').remove();
});

var dietary_restrictions = ["vegan", "vegetarian", "paleo", "dairy-free", "gluten-free", "wheat-free", "fat-free", "low-sugar", "egg-free", "peanut-free", "tree-nut-free", "soy-free", "fish-free", "shellfish-free"];

for (var i=0; i < dietary_restrictions.length; i++) {
    var restriction = $('<li>');

    restriction.html('<input type="checkbox" class="mr-1" value="' + dietary_restrictions[i] + '">');

    restriction.append(dietary_restrictions[i]);

    $('#health-search').append(restriction);
}

