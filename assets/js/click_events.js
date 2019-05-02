// 1. When the results page first loads, it looks for parameters in the URL and hits the API
// 2. Helper function to get URL params
// 3. Takes in new filters and hits API

// 1. Looks for params in URL and hits API
// NOTE: we could theoretically run all calls through this
$(document).ready(function(){

    // Looks at the url and grabs the param for restaurant + location from local storage

    var exclude = localStorage.getItem('exclude');
console.log("exclude: " + exclude)
    
    console.log("restaurant: " + localStorage.getItem('restaurant'));
    console.log("location: " + localStorage.getItem('location'));
    console.log("ingredients: " + localStorage.getItem('ingredients'));

    // Update search box for restaurant with user's input
    $('#restaurant-search-index').val(localStorage.getItem('restaurant'));
    api_obj.yelpToCuisine(
        localStorage.getItem('restaurant')
        , localStorage.getItem('location')
        , localStorage.getItem('ingredients') // ["kale", "lettuce", "tomato"] // - ingredients
        // , []
        , exclude
        // , []
        , localStorage.getItem('health') // ['peanut-free'] // - healthLabels
        // ,[]
        , onclickCallback
        , "onclick"
    )
    function onclickCallback(result) {
        console.log("onclick callback" + result);
        console.log(result);    


        // Need to fix
/*         result.forEach(function(business) {
            var suggestion = $('<div>');
            suggestion.addClass('col-md-4 suggested');
            suggestion.append('<img class="imgportf suggested-rest" restaurant="' +business.name+ '" src="' +business.image_url+ '" />');
            suggestion.append('<h5 class="suggested-rest" restaurant="' +business.name+ '" >' +business.name+ '</h5>');
            $('#suggestions').append(suggestion);
        }); */
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
        localStorage.getItem('restaurant')
        , localStorage.getItem('location')
        , localStorage.getItem('ingredients') // ["kale", "lettuce", "tomato"] // - ingredients
        , localStorage.getItem('exclude') // ["kiwi", "pineapple"] // - exclusion
        , localStorage.getItem('health') // ['peanut-free'] // - healthLabels
        , onclickCallback
        , "onclick"
    )
    console.log("clicked button"); 
});

