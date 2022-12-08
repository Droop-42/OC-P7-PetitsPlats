
function filterSearchV2 (searchInput, recs) {
    const SearchInputWords = searchInput.toLowerCase().split(" ")
    //let filteredRecipes = JSON.parse(JSON.stringify(recipes)) 
    let filteredRecipes = recipes.map(recipe => new Recipe(recipe)) 
    //console.log(recipes, "***",filteredRecipes)

    for (let i in SearchInputWords) {
        let recipeToRemove = []
        for (let r in filteredRecipes) {
            let isInUst = filterUstensils(SearchInputWords[i], filteredRecipes[r])
            let isInIngr = filterIngredients(SearchInputWords[i], filteredRecipes[r])
            let isInName = filteredRecipes[r].name.toLowerCase().indexOf(SearchInputWords[i]) != -1
            let isInDescr = filteredRecipes[r].description.toLowerCase().indexOf(SearchInputWords[i]) != -1
            let isInAppli = filteredRecipes[r].appliance.toLowerCase().indexOf(SearchInputWords[i]) != -1

            //console.log(isInAppli, isInName, isInDescr, isInUst > 0, isInIngr > 0)

            if (!(isInAppli || isInName || isInDescr || isInUst > 0 || isInIngr > 0)) {
                recipeToRemove.push(filteredRecipes[r])
            }
        }
        if (recipeToRemove.length > 0) {
            //console.log('rmv',recipeToRemove)
            filteredRecipes = multiRemove(filteredRecipes, recipeToRemove)
            //console.log('0',filteredRecipes, ' ',SearchInputWords[i])
        }
        
        //console.log('1',filteredRecipes, ' ',SearchInputWords[i])
    }
    //console.log('2',filteredRecipes)
    return filteredRecipes
}


function filterUstensils (inputWord, recipe) {
    for (let x = 0; x < recipe.ustensils.length; x++) { 
        //console.log("ust base",x,":",recipe.ustensils, "nbr:",recipe.ustensils.length)
        if (recipe.ustensils[x].toLowerCase().indexOf(inputWord) != -1) { 
            //console.log("ust",recipe.ustensils[x])
            return 1
        } 
    }
    return 0
}

function filterIngredients (inputWord, recipe) {
    
    for (let y in recipe.ingredients) { 
        //console.log("ingr base", y, ":",recipe.ingredients)
        if (recipe.ingredients[y].ingredient.toLowerCase().indexOf(inputWord) != -1) {
            //console.log("ingr",recipe.ingredients[y].ingredient)
            return 1
        } 
    }
    return 0
}

function multiRemove(Arr, ItemstoRemove){
    for(i = 0; i < ItemstoRemove.length; i++){
        var ArrIndex = Arr.indexOf(ItemstoRemove[i]);
        if(ArrIndex > -1){
            Arr.splice(ArrIndex, 1);
        }
    }
    return Arr
}