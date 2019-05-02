dom_manipulation = {
    // Nested forEach functions to create divs with appropiate styling for each restaurant
    addSuggestions : function(businesses) {
        // splice to remove unnecessary amount of restaurants (6-19)
        // businesses.splice(6,14);
        console.log("businesses before dedupe: ");
        console.log(businesses);

        var businessArr = [];
        var businessObj = [];
        console.log(businesses[0].name)
        console.log(businesses[0])
        businesses.some(function(business) {
            if(!businessArr.includes(business.name)) {
                businessObj.push(business);
                businessArr.push(business.name)
                console.log("test");
                console.log(businessObj);
            }
            return businessObj.length === 6;
        });
        console.log("businesses after dedupe: ");
        console.log(businessObj);

        businessObj.forEach(function(business) {
            var suggestion = $('<div>');
            suggestion.addClass('col-md-4 suggested');
            suggestion.append('<img class="imgportf suggested-rest" restaurant="' +business.name+ '" src="' +business.image_url+ '" />');
            suggestion.append('<h5 class="suggested-rest" restaurant="' +business.name+ '" >' +business.name+ '</h5>');
            $('#suggestions').append(suggestion);
        });

        // hides loading image and unhides suggestion divs once all suggestions are loadded above
        $('#loading').addClass('hidden');
        $('#suggestions').removeClass('hidden');
    },
}; 