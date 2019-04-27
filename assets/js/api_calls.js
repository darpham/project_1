
    
// each of these takes in an array of strings

var restaurantSearch = 'akikos';
var restaurantLocationSearch = 'San Francisco';
var ingredientsArr = ['salmon'];
var excludeArr = ['kiwi'];
var healthArr = ['Peanut-Free', 'Tree-Nut-Free'];

var config = {
    apiKey: "AIzaSyB0yGDhu2GbRbqDZrEAxNn2OlT4Hp09-_I",
    authDomain: "test-app-2925d.firebaseapp.com",
    databaseURL: "https://test-app-2925d.firebaseio.com",
    projectId: "test-app-2925d",
    storageBucket: "test-app-2925d.appspot.com",
    messagingSenderId: "485968493410"
  };
  firebase.initializeApp(config);

  var database = firebase.database().ref().child('credentials');
  

// Object that takes in parameters, pings the API, and returns an object
var api_obj = {

    // Inputs: takes in a single restaurant (string), and single location (string, e.g. San Francisco), Expects values, not an array or jquery object
    // Outputs: a string (cuisine)
    yelpToCuisine : function(restaurant, location, ingredients, exclude, health) {
        $(".loader").show();
        
        // console.log(database.ref().on("value", function(snapshot) {return snapshot.val().credentials.yelp.yelpHeaders;}));


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

        database.child('yelp').on('value', function(snapshot) {
            var yelpHeaders = snapshot.val().yelpHeaders;

            $.ajax({
                url: myurl,
                method: "GET",                
                dataType: 'json',
                headers: {'Authorization': yelpHeaders,},
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

        database.child('edamam').on('value', function(snapshot) {

            console.log("excludeString: " + excludeString + " healthString: " + healthString);
    
            var app_id = snapshot.val().app_id;
            var app_key = snapshot.val().app_key;
  
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