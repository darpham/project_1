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