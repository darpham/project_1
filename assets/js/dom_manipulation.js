// On document load, makes a call to get the default recipes
$(document).ready(function(){

    // When the index.html loads, this calls the API so that we can get default "popular" recipes to show
    // NOTE: Default API call doesn't need optional parameters    
    function pageloadCallback(result) {
        console.log("")
        console.log(result);

// --------------------------------------------------------------------------------
        // Add functionality to display recommended restaurants
// --------------------------------------------------------------------------------
    };

    api_obj.yelpToCuisine (
        default_settings.fav_restaurants[Math.floor(Math.random()*default_settings.fav_restaurants.length)]
        , "San Francisco"
        , [] // ["kale", "lettuce", "tomato"] // - ingredients
        , [] // ["kiwi", "pineapple"] // - exclusion
        , [] // ['peanut-free'] // - healthLabels
        , pageloadCallback // 
        , "pageload" // - type of function
    )
});

$("#search").on("click", function() {
    event.preventDefault();
    
    function onclickCallback(result) {
        console.log("onclick callback" + result);
        console.log(result);

// --------------------------------------------------------------------------------
        // Add functionality to display recipes
// --------------------------------------------------------------------------------

    };
    
// --------------------------------------------------------------------------------
        // Change this function below to pass the right params
// --------------------------------------------------------------------------------

    api_obj.yelpToCuisine("burma love"
        , "San Francisco"
        , [] // ["kale", "lettuce", "tomato"] // - ingredients
        , [] // ["kiwi", "pineapple"] // - exclusion
        , [] // ['peanut-free'] // - healthLabels
        , onclickCallback
        , "onclick"
    )
    console.log("clicked button"); 
});

