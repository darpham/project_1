// File to grab inputs the user's preferences
// This JS only interacts with result.html and will update the inputs variables needed for the api_calls.js

// Global variables to pass into api_calls.js
// Required
var restaurantStr = "";
var locationStr = "San Francisco";

// Optional filters
var ingredientsArr = [];
var excludeArr = [];
var healthArr = [];


// 
// jQuery and JavaScript for restaurant and location
// 

// updates restaurant search field everytime a user presses a new key in the input field
$('#restaurant-search-result').on('input',function() {
    // grabs current value in restaurant search input and assigns it to our global string
    restaurantStr = $('#restaurant-search-result').val().trim();
});

// updates location search field everytime a user presses a new key in the input field
$('#location-search').on('input',function() {
    // grabs current value in restaurant search input and assigns it to our global string
    locationStr = $('#location-search').val().trim();
});


//
// jQuery and JavaScript for Filters below
// 

// Listener to add ingredients the user wants to include the the recipe
$('#add-ingredient').on('click', function(event) {

    // Parses ingredient name from text box input
    var ingredient = $('#ingredient-to-add').val().trim();

    // Checks if user left box empty
    if (ingredient == '') {
        console.error("no ingredient specified");
    // checks if the user already added that ingredient
    } else if (ingredientsArr.includes(ingredient)) {
        console.error("user already included that ingredient");
        $('#ingredient-to-add').val('');
        $('#ingredient-to-add').attr('placeholder',"Already included");

    // Adds ingredient to global variable and html
    } else {

        // pushes ingredient into global variable
        ingredientsArr.push(ingredient);

        // creates p to hold ingredient info
        var foodItem = $('<p>');
        foodItem.attr('id', ingredient);
        foodItem.text(ingredient);
    
        // creates button to delete ingredient if users wants
        var foodDelete = $('<button>');
        foodDelete.attr('ingredient', ingredient);
        foodDelete.addClass('delete in');
        foodDelete.text("x");
        foodItem = foodItem.prepend(foodDelete);
    
        // adds newly created ingredient to html
        $('#include-ingredients').append(foodItem);
    
        // Updates placeholder and clears textbox
        $('#ingredient-to-add').attr('placeholder',"Ingredients");
        $('#ingredient-to-add').val('');
    };

});

// Listener to exclude ingredients the user doesn't want in the recipe
$('#ex-ingredient').on('click', function(event) {

    // Parses indgredient the user inputted in the text box
    var ingredient = $('#ingredient-to-exclude').val().trim();

    // check if the users adds nothing
    if (ingredient == '') {
        console.error("no ingredient specified");

    // checks if the user already added the ingredient
    } else if (excludeArr.includes(ingredient)) {
        console.error("user already included that ingredient to exclude");
        $('#ingredient-to-exclude').val('');
        $('#ingredient-to-exclude').attr('placeholder',"Already excluded");

    // adds the ingredient to global variable and html
    } else {
        excludeArr.push(ingredient);

        // creates p with ingredient info
        var foodItem = $('<p>');
        foodItem.attr('id', ingredient);
        foodItem.text(ingredient);
    
        // creates button to delete item if no longer wanted
        var foodDelete = $('<button>');
        foodDelete.attr('ingredient', ingredient);
        foodDelete.addClass('delete ex');
        foodDelete.text("x");
        foodItem = foodItem.prepend(foodDelete);
    
        // adds newly created ingredient to list
        $('#exclude-ingredients').append(foodItem);
    
        // updates placeholder and clears out ingredient text box
        $('#ingredient-to-exclude').attr('placeholder',"Exclude Ing");
        $('#ingredient-to-exclude').val("");
    };

});

// Listener to delete ingredients the user filtered
$(document.body).on('click', '.delete', function() {

    // parses ingredient from the attribute
    var ingredient = $(this).attr('ingredient');

    // removes the ingredient from the correct array in the backend depending on if it's from the include or exlcude ingredients
    if ($(this).hasClass('ex')) {
        var i = excludeArr.indexOf(ingredient)
        if (i != -1) {
            excludeArr.splice(i, 1);
        };
    } else if ($(this).hasClass('in')) {
        var i = ingredientsArr.indexOf(ingredient)
        if (i != -1) {
            ingredientsArr.splice(i, 1);
        };
    };

    // removes the p (ingredient) from results.html
    $(this).closest('p').remove();
});

// List of health labels (dietary restrictions)
var dietary_restrictions = ["vegan", "vegetarian", "paleo", "dairy-free", "gluten-free", "wheat-free", "fat-free", "low-sugar", "egg-free", "peanut-free", "tree-nut-free", "soy-free", "fish-free", "shellfish-free"];

// for loop to create list of health labels in the results.html
for (var i=0; i < dietary_restrictions.length; i++) {

    // creates list item
    var restriction = $('<li>');

    // adds checkbox
    restriction.html('<input type="checkbox" class="mr-1" value="' + dietary_restrictions[i] + '">');

    // adds text via append, this is important as to not overwrite the checkbox created above
    restriction.append(dietary_restrictions[i]);

    // adds the new list item to health-search
    $('#health-search').append(restriction);
};

// Updates backend array for health labels everytime the user clicks within the div
$('#health-search').on('click', function() {

    // clears out the health array to catch issue when user unchecks an option
    healthArr = [];

    // checks every list item
    $(this).children('li').each(function () {

        // if the item is checked
        if ($(this).children('input').is(':checked')) {

            // adds the item to newly cleared health array
            healthArr.push($(this).children('input').attr('value'));
        };
    });

});
