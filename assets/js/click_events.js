var restaurantParam = "";
var locationParam = "";


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

function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('restaurantstr');
    return myParam
}


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

function getParams() {
    var urlParams = new URLSearchParams(window.location.search);
    restaurantParam = urlParams.get('restaurantstr');
    locationParam = urlParams.get('locationstr');
    // return myParam
}