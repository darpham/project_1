
// On document load, makes a call to get the default recipes
$(document).ready(function(){
    // note: it doesn't need optional parameters

    api_obj.yelpToCuisine(
        default_settings.fav_restaurants[Math.floor(Math.random()*default_settings.fav_restaurants.length)]
        , default_settings.default_location
    );

});


$("#search").on("click", function() {
    
    var cuisineOutput = "";

    // api_obj.yelpToCuisine(restaurantSearch, restaurantLocationSearch, ingredientsArr, excludeArr, healthArr)
    api_obj.yelpToCuisine(restaurantSearch, restaurantLocationSearch);
    

    console.log("clicked button"); 
});


