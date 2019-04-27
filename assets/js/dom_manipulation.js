

$(document).ready(function(){
    var ingredientsArr = [];
    var excludeArr = [];
    var healthArr = [];

    api_obj.yelpToCuisine(
        default_settings.fav_restaurants[Math.floor(Math.random()*default_settings.fav_restaurants.length)]
        , default_settings.default_location
        , ingredientsArr
        , excludeArr
        , healthArr
    );

});




$("#search").on("click", function() {
    
    var cuisineOutput = "";
    // uses Jquery to pull values

    // values required for Yelp
    // restaurantSearch = $("#restaurant-search")
    // restaurantLocationSearch = $("#location-search")

    // values required for Edamam
    // ingredientsArr = $("#ingredients-search").val();
    // excludeArr = $("#exclude-search").val();

    api_obj.yelpToCuisine(restaurantSearch, restaurantLocationSearch, ingredientsArr, excludeArr, healthArr)
    

    console.log("clicked button"); 
});


