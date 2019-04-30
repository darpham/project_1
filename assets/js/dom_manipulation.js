
// On document load, makes a call to get the default recipes
$(document).ready(function(){

    // When the index.html loads, this calls the API so that we can get default "popular" recipes to show
    // NOTE: Default API call doesn't need optional parameters

    
    function myCallback(result) {
        console.log("did it work?");
        console.log("results: ")
        console.log(result);
/* 
        for (var i = 0; i < 6; i++) {
            result.businesses[i]
        }
 */

        var img = result.businesses[0].image_url
        $("#store-1").attr('src', img);
        console.log("img: " + img)

 console.log(result.businesses[0].name);
        console.log(result.businesses[1].name);
        console.log(result.businesses[2].name);
    };

    api_obj.yelpToCuisine(default_settings.fav_restaurants[Math.floor(Math.random()*default_settings.fav_restaurants.length)]
        , "San Francisco"
        , []
        , []
        , []
        , myCallback
        , "pageload"
    )

    


        // , "San Francisco"
        // , ["kale"]
        // , ["kale", "lettuce"]
        // , ["kale", "lettuce", "tomato"]
        // , []
        // , ["kiwi", "pineapple"]
        // , ['peanut-free']



    
    // console.log("defaultRecipe: " + defaultRecipe);
    // console.log("resultObj: " + resultObj);
    // console.log(resultObj);



/*     for(var i = 0; i < 2; i++) {
        console.log(resultObj.hits[i].recipe.image);
    } */
    
});

$("#search").on("click", function() {

    event.preventDefault();
    
    var restaurantSearch = 'akikos';
    var restaurantLocationSearch = 'San Francisco';
    
    // api_obj.yelpToCuisine(restaurantSearch, restaurantLocationSearch, ingredientsArr, excludeArr, healthArr)
    // api_obj.yelpToCuisine(restaurantSearch, restaurantLocationSearch);



    function myCallback(result) {
        console.log("did it work?");
        console.log(result);
        for(var i = 0; i < 6; i++) {
            console.log(result.hits[i].recipe.image)
        }    
    };

    
    api_obj.yelpToCuisine(default_settings.fav_restaurants[Math.floor(Math.random()*default_settings.fav_restaurants.length)]
        , "San Francisco"
        , []
        , []
        , []
        , myCallback
    )



    console.log("clicked button"); 
});

