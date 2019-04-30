// 1. When the results page first loads, it looks for parameters in the URL and hits the API
// 2. Helper function to get URL params
// 3. Takes in new filters and hits API


var restaurantParam = "";
var locationParam = "";

// 1. Looks for params in URL and hits API
// NOTE: we could theoretically run all calls through this
$(document).ready(function(){

    // Looks at the url and grabs the param for restaurant + location
    getParams();
    console.log("restaurant: " + restaurantParam);
    console.log("location: " + locationParam);

    api_obj.yelpToCuisine(
        restaurantParam
        , locationParam
        , [] // ["kale", "lettuce", "tomato"] // - ingredients
        , [] // ["kiwi", "pineapple"] // - exclusion
        , [] // ['peanut-free'] // - healthLabels
        , onclickCallback
        , "onclick"
    )
    function onclickCallback(result) {
        console.log("onclick callback" + result);
        console.log(result);    
// --------------------------------------------------------------------------------
        // Add functionality to display recipes
// --------------------------------------------------------------------------------
    };
});



// 2. Param helper function
function getParams() {
    var urlParams = new URLSearchParams(window.location.search);
    restaurantParam = urlParams.get('restaurantstr');
    locationParam = urlParams.get('locationstr');
    // return myParam
}



// 3. Takes in new filters and hits API
$(".searchfa").on("click", function() {

    var restaurant = getParams();

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

    api_obj.yelpToCuisine(
        restaurant
        , "San Francisco"
        , [] // ["kale", "lettuce", "tomato"] // - ingredients
        , [] // ["kiwi", "pineapple"] // - exclusion
        , [] // ['peanut-free'] // - healthLabels
        , onclickCallback
        , "onclick"
    )
    console.log("clicked button"); 
});

