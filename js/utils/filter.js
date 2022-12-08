function filterSearch (searchInput, recipes) {
    const SearchInputWords = searchInput.toLowerCase().split(" ")
    let filteredRecipes = recipes
    SearchInputWords.forEach(searchWord => 
        filteredRecipes = filteredRecipes.filter(recipe => {
            let isInUst = 0
            let isInIngr = 0
            let isInName = recipe.name.toLowerCase().indexOf(searchWord) != -1
            let isInDescr = recipe.description.toLowerCase().indexOf(searchWord) != -1
            let isInAppli = recipe.appliance.toLowerCase().indexOf(searchWord) != -1
            
            recipe.ustensils.forEach( ust => {
                if (ust.indexOf(searchWord) != -1) {
                    isInUst += 1
                } 
                else if (ust.indexOf(searchWord) == -1) {
                    isInUst += 0
                }
            })

            recipe.ingredients.forEach( desc_ingr => {
                if (desc_ingr.ingredient.toLowerCase().indexOf(searchWord) != -1) {
                    isInIngr += 1
                } 
                else if (desc_ingr.ingredient.toLowerCase().indexOf(searchWord) == -1) {
                    isInIngr += 0
                }
            })              
            return isInAppli || isInName || isInDescr || isInUst > 0 || isInIngr > 0
        })
        
        //, console.log('1',filteredRecipes,' '/*,searchWord*/)// see result!!!? "forEach is not chainable"
    )
    //console.log('2',filteredRecipes)
    return filteredRecipes
}