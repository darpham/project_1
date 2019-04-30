
// On document load, makes a call to get the default recipes
$(document).ready(function(){

    // When the index.html loads, this calls the API so that we can get default "popular" recipes to show
    // NOTE: Default API call doesn't need optional parameters
    api_obj.yelpToCuisine(default_settings.fav_restaurants[Math.floor(Math.random()*default_settings.fav_restaurants.length)]
        , "San Francisco"
        // , ["kale"]
        // , ["kale", "lettuce"]
        // , ["kale", "lettuce", "tomato"]
        , []
        , ["kiwi", "pineapple"]
        , ['peanut-free']
    
    );
});

$("#search").on("click", function() {

    event.preventDefault();
    
    var restaurantSearch = 'akikos';
    var restaurantLocationSearch = 'San Francisco';
    
    // api_obj.yelpToCuisine(restaurantSearch, restaurantLocationSearch, ingredientsArr, excludeArr, healthArr)
    api_obj.yelpToCuisine(restaurantSearch, restaurantLocationSearch);
    

    console.log("clicked button"); 
});

