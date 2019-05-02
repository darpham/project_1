// 1. When the results page first loads, it looks for parameters in the URL and hits the API
// 2. Helper function to get URL params
// 3. Takes in new filters and hits API

// 1. Looks for params in URL and hits API
// NOTE: we could theoretically run all calls through this
$(document).ready(function(){

    // Looks at the url and grabs the param for restaurant + location from local storage

    console.log("restaurant: " + localStorage.getItem('restaurant'));
    console.log("location: " + localStorage.getItem('location'));

    api_obj.yelpToCuisine(
        localStorage.getItem('restaurant')
        , localStorage.getItem('location')
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

// 3. Takes in new filters and hits API
$(".searchfa").on("click", function() {

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

