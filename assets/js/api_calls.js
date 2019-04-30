// Creates an empty object to store the result object
var resultObj = {};


// Setup firebase
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
    yelpToCuisine : function(restaurant, location, ingredients, exclude, health, callback, callType) {
        
        // console logs so that you know when the method is successfully called
        console.log("yelp call made");
        
        $(".loader").show();

        // makes params optional, though you still need to send an empty array if only missing specific params
        // ----Need to handle a case where they provide exclude but no ingredients----
        location = location || "San Francisco";
        ingredients = ingredients || [];
        exclude = exclude || [];
        health = health || [];

        // Transforms the inputs and creates the API query
        location = location.replace(/\s/g, '');
        var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-" + restaurant + "&location=" + location;
        var cuisineString = "";
        
        // console logs so that you can see the string that gets passed into the search
        console.log("search restaurant: " + restaurant);
        console.log("search location: " + location);
        console.log("search query: " + myurl);

        // Uses firebase to grab creds
        database.child('yelp').on('value', function(snapshot) {
            var yelpHeaders = snapshot.val().yelpHeaders;

            $.ajax({
                url: myurl,
                method: "GET",                
                dataType: 'json',
                headers: {'Authorization': yelpHeaders,},
                success: function (data) {
                    if(callType == "pageload") {
                        console.log("callback?!?")
                        callback(data);
                    }
                    else if (callType == "onclick") {
                        
                        // Option 1: Will loop through only the first two items. Sometimes gets better results
                        var j = 0;
                        if(response.businesses[0].categories.length == 1){
                            cuisineString = response.businesses[0].categories[0].alias}
                        else {
                            cuisineString = response.businesses[0].categories[0].alias + "," + response.businesses[0].categories[1].alias
                        };
                
                        // Option 2: Will loop through all items
            /*                 for(var i = 0; i < response.businesses[0].categories.length; i++) {
                            // if current iteration is at the end of the list...
                            if(i == response.businesses[0].categories.length-1) { 
                                // then don't concat a comma
                                cuisineString = cuisineString.concat(response.businesses[0].categories[i].alias);    
                            }
                            else { 
                                // otherwise concat a comma
                                cuisineString = cuisineString.concat(response.businesses[0].categories[i].alias).concat(",");
                            }
                        } */
                        
                        // calls cuisineToRecipe and passes along params

                        api_obj.cuisineToRecipe(cuisineString, ingredients, exclude, health, callback)
                    }

                }
            })
            .then(function(response) {

                console.log("yelp response: ");
                console.log(response);

                // return response
            });
        });
    },


    // input: type of cuisine (string), ingredients (array), ingredients to be excluded (array), and health preferences (array)
    // output: Returns an object with arrays of "hits" (e.g. recipes). Also saves this as a variable called resultObj
    cuisineToRecipe : function(cuisineString, ingredientArr, excludeArr, healthArr, callback) {

        // console logs so that you know when the method is successfully called
        console.log("Edamam call made");

        ingredientString = helper_func.arrUrl(ingredientArr, '', ",");
        excludeString = helper_func.arrUrl(excludeArr, 'exclude=', "&");
        healthString = helper_func.arrUrl(healthArr, 'healthLabels=', "&");
        
        var q = cuisineString + ingredientString;
        var from = 0;
        var to = 10;

        database.child('edamam').on('value', function(snapshot) {

            // grabs keys from firebase and creates URL
            var app_id = snapshot.val().app_id;
            var app_key = snapshot.val().app_key;
            var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + q + excludeString + healthString + "&from=" + from + "&to=" + to + "&app_id="+app_id+"&app_key="+app_key;

            console.log("search string: " + queryURL);
    
            $.ajax({
                url: queryURL,
                method: "GET",  
                success: callback
            })
            .then(function(response) {
                console.log("edamam response: ")

                // Hides the spinning wheel
                $(".loader").hide();

                // I also set a value for resultObj in case we want the result at the top-level
                resultObj = response;

                // console.log("resultObj: " + resultObj)

                //success: callback
            });
        });
    }};



// Object that takes in arrays and transforms them into a format that can be accepted by the api_obj methods
var helper_func = {

    // input: array
    // output: Same array with duplicates removed
    arrDup: function(arr) {
        return [...new Set(arr)];
    },


    // input: array and a set of characters (depending on which parameters of the query you're trying to build)
    // output: a string that can be used by the api_obj methods
    arrUrl: function(arr, appendChar, delimiter) {
        var urlArr = this.arrDup(arr);
        var urlString = '';

        // if the array has more than 2 values
        if(urlArr.length > 1) {
            urlString = delimiter + appendChar + arr[0];
            for(var i = 1; i < urlArr.length; i++) {
                urlString += (delimiter + appendChar + urlArr[i]);
            }
            return urlString;
        }
        // if the array has no values
        else if(arr[0] === undefined) {
            return [];
        }
        else return delimiter + appendChar + arr[0];
    },
};