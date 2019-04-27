# Yelp El-Eat


<h2>Functionality</h2>
<ul>
    <li>Takes inputs including a restaurant, a location, and other values</li>
    <li>Provides recommended recipes based on the input values</li>
    <li>Also suggests popular dishes</li>
</ul>

<h2>Objects</h2>

<h4>api_obj.yelpToCuisine(restaurant, location, ingredients, exclude, health)</h4>
<ul>
    <li>Inputs: takes in a single restaurant (string), and single location (string, e.g. San Francisco), Expects values, not an array or jquery object</li>
    <li>Outputs: a string (cuisine)</li>
    <li>Action: calls cuisineToRecipe, and passes cuisine, as well as ingredients, exclude, and health</li>
</ul>

<h4>api_obj.cuisineToRecipe(cuisineString, ingredientArr, excludeArr, healthArr)</h4>
<ul>
    <li>Input: type of cuisine (string), ingredients (array), ingredients to be excluded (array), and health preferences (array)</li>
    <li>Output: object with arrays of "hits" (e.g. recipes)</li>
</ul>


