// 1. When the results page first loads, it looks for parameters in the URL and hits the API
// 2. Helper function to get URL params
// 3. Takes in new filters and hits API

// 1. Looks for params in URL and hits API
// NOTE: we could theoretically run all calls through this
$(document).ready(function(){

    // Update search box for restaurant with user's input
    $('#restaurant-search-result').val(localStorage.getItem('restaurant'));

    // yelp api call
    api_obj.yelpToCuisine(
        localStorage.getItem('restaurant')
        , localStorage.getItem('location')
        , localStorage.getItem('ingredients')
        , localStorage.getItem('exclude')
        , localStorage.getItem('health')
        , onclickCallback
        , 'onclick'
    )
    function onclickCallback(result) {
        console.log("onclick callback for document.ready for result.html " + result);
        // console.log(result);

       dom_manipulation.addRecipes(result.hits);
    };
});

// 3. Takes in new filters and hits API
$('#result-search-button').on('click', function() {

    // emptys out div that holds recipes for new ones
    $('#suggested-recipes').empty();

    function onclickCallback(result) {
        console.log("onclick callback for search button on result.html " + result);
        // console.log(result.hits);
        
        // Passes array of recipes into function that will create the recipes on the page
        dom_manipulation.addRecipes(result.hits);
    };
    
    api_obj.yelpToCuisine(
        localStorage.getItem('restaurant')
        , localStorage.getItem('location')
        , localStorage.getItem('ingredients')
        , localStorage.getItem('exclude')
        , localStorage.getItem('health')
        , onclickCallback
        , "onclick"
    )
    console.log("clicked search button on result.html"); 
});