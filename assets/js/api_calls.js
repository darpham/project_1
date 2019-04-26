
    
// each of these takes in an array of strings

var restaurantSearch = 'akikos';
var restaurantLocationSearch = 'San Francisco';
var ingredientsArr = ['salmon'];
var excludeArr = ['kiwi'];
var healthArr = ['Peanut-Free', 'Tree-Nut-Free'];

$("#search").on("click", function() {
    
    var cuisineOutput = "";
    // uses Jquery to pull values

    // values required for Yelp
    // restaurantSearch = $("#restaurant-search")
    // restaurantLocationSearch = $("#location-search")

    // values required for Edamam
    // ingredientsArr = $("#ingredients-search").val();
    // excludeArr = $("#exclude-search").val();
    $(".loader").show();
    api_obj.yelpToCuisine(restaurantSearch, restaurantLocationSearch, ingredientsArr, excludeArr, healthArr)
    
    console.log("clicked button"); 
});

// Object that takes in parameters, pings the API, and returns an object
var api_obj = {

    // Inputs: takes in a single restaurant (string), and single location (string, e.g. San Francisco), Expects values, not an array or jquery object
    // Outputs: a string (cuisine)
    yelpToCuisine : function(restaurant, location, ingredients, exclude, health) {
        
        // console logs so that you know when the method is successfully called
        console.log("yelp query run");

        // Transforms the inputs and creates the API query
        // restaurant = restaurant.val();
        // location = location.val().replace(/\s/g, '');
        location = location.replace(/\s/g, '');
        var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-" + restaurant + "&location=" + location;
        var cuisineString = "";
        
        // console logs so that you can see the string that gets passed into the search
        console.log("search restaurant: " + restaurant);
        console.log("search location: " + location);
        console.log("search query: " + myurl);

        $.ajax({
            url: myurl,
            method: "GET",                
            dataType: 'json',
            headers: {'Authorization': 'Bearer Xtg-ETMFIqtxhmgIcRKBksYvG86inYhtAJxQjT87qzbrGSJ1Gte9bNX3tv0HDgB_nIpdi0DuPZH1zHad6lv2TrjPv2-UgNLCnUKFRB3AHjoiPTv2bdkAqPV-grO-XHYx',},
        })
        .then(function(response) {

            console.log(response);

            for(var i = 0; i < response.businesses[0].categories.length; i++) {
                console.log(response.businesses[0].categories[i].alias);
                cuisineString = cuisineString.concat(response.businesses[0].categories[i].alias).concat(" ");
                console.log(cuisineString);
            }
            api_obj.cuisineToRecipe(cuisineString, ingredients, exclude, health);
        });
    },

    // input: type of cuisine (string), ingredients (array), ingredients to be excluded (array), and health preferences (array)
    // output: object with arrays of "hits" (e.g. recipes)
    cuisineToRecipe : function(cuisineString, ingredientArr, excludeArr, healthArr) {

        // console logs so that you know when the method is successfully called
        console.log("Edamam query run");

        // log the inputs
        console.log("cuisineString: " + cuisineString + " ingredients: " + ingredientArr + " exclude: " + excludeArr + " health: " + healthArr);

        excludeString = url_builder_obj.arrUrl(excludeArr, 'exclude=');
        healthString = url_builder_obj.arrUrl(healthArr, 'health=');

        var ingredientString = ingredientArr.join(' ')
        var q = cuisineString + ingredientString;
        var from = 0;
        var to = 10;
        let app_id = '5540b406';
        let app_key = '43e39952e7ae124cfd82f0b1b8c3c18b'
        console.log("excludeString: " + excludeString + " healthString: " + healthString);

        // Can't get "health" to work for some reason. Keep getting 403. Maybe they stopped supporting?
        // var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + q + "&" + excludeString + "&" + healthString + "&from=" + from + "&to=" + to + "&app_id="+app_id+"&app_key="+app_key;
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + q + "&" + excludeString + "&from=" + from + "&to=" + to + "&app_id="+app_id+"&app_key="+app_key;
        
        console.log("search string: " + queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",                
        })
        .then(function(response) {
            console.log(response);
            $(".loader").hide();
            return response;
            
        });

    }};



// Object that takes in arrays and transforms them into a format that can be accepted by the api_obj methods
var url_builder_obj = {

    // input: array
    // output: Same array with duplicates removed
    arrDup: function(arr) {
        return [...new Set(arr)];
    },

    // input: array and a set of characters (depending on which parameters of the query you're trying to build)
    // output: a string that can be used by the api_obj methods
    arrUrl: function(arr, appendChar) {
        var urlArr = this.arrDup(arr);
        var urlString = '';
        urlString = appendChar + arr[0];

        if(urlArr.length > 1) {
            for(var i = 1; i < urlArr.length; i++) {
                urlString += ('&' + appendChar + urlArr[i]);
            }
            console.log("url: " + urlString);
            return urlString;
        }
        else return appendChar + arr[0];
    }
};