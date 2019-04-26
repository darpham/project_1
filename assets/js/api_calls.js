
    $("#search").on("click", function() {
        
        yelpTags();
        console.log("clicked");
        
    });
 
    function yelpTags() {
        $(".loader").show();
        console.log("search query run");

        var search = $("#restaurant").val().trim();
        console.log("search term " + search);

        var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-" + search + "&location=sanfrancisco";
        var cuisineString = "";

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
            getRecipe(cuisineString);
        });
    };

    function getRecipe(cuisineString) {
        console.log("recipe query run");

        var from = 0;
        var to = 10;
        var search = cuisineString;
        let app_id = '5540b406';
        let app_key = '43e39952e7ae124cfd82f0b1b8c3c18b'
        var queryURL = "https://api.edamam.com/search?q="+search+"&from=" + from + "&to=" + to + "&app_id="+app_id+"&app_key="+app_key;

        console.log("search string" + search);

        $.ajax({
            url: queryURL,
            method: "GET",                
        })
        .then(function(response) {
            console.log(response);
            
            for(var i = 0; i < 4; i++) {
                var recipeDiv = $("<div>");
                var newLink = $('<a />', {
                    id : "recipeLink",
                    name : "link",
                    href : response.hits[i].recipe.url,
                    text : response.hits[i].recipe.label
                });
                var foodImage = $('<img />', {
                    id : "foodImg",
                    src: response.hits[i].recipe.image,
                    alt: 'food image'
                });
                recipeDiv.append(newLink);
                recipeDiv.append(foodImage);
                $("#recipe").append(recipeDiv);
            }
            $(".loader").hide();
        });
    };