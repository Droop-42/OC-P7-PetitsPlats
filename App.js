class App {
    
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.RecipesData = recipes // JSON file
    }

    async main() {

        const Recipes = this.RecipesData.map(recipe => new Recipe(recipe)) // formated JSON data
        let recipesWrapper =this.$recipesWrapper       
        let filteredRecipes = Array.from(Recipes) // initialize filteredRecipes, list of filtered recipes by words in searchbar 
        let searchValue = ''
 
        // Show cards (filtered) card recipes
        function showResult (Rec) {
            recipesWrapper.textContent = ''
            Rec.forEach(recipe => {
                const Template = new RecipeCard(recipe)
                recipesWrapper.appendChild(
                    Template.createRecipeCard()
                )
            })
        }

        // Searchbar filter recipe on input and show result
        document.getElementById('searhBar').addEventListener('input', function () {
            searchValue = document.getElementById('searhBar').value
            if (searchValue.length  > 2) { 
                //------------------- Start timer ----------------
                const t0 = performance.now();
                for (let i=0; i < 2000; i++){
                    filteredRecipes = filterSearch(searchValue, Array.from(Recipes))
                    //document.getElementById('searhBar').value = " "
                }
                //-------------------- End timer ---------------
                const t1 = performance.now();
                console.log(`Call to filtrSearch took ${(t1 - t0)/2000} milliseconds in average.`);             
                
                showResult(filteredRecipes)

            }
            else if (searchValue.length  < 3) {
                showResult(Recipes)
            }
        }) 
        showResult(filteredRecipes);    
    }
}

const app = new App()
app.main()



