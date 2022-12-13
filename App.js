class App {
    
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.RecipesData = recipes // JSON file
    }

    async main() {

        let tagFilteredRecipes = ""// list of filtered recipes by tags
        let listTagBtn = `` // list of tags formated in HTML
        let listTag = []; // list of tags used for filter algo
        let list_tag_id = []; // list of tags id used for remove btn tag from lists
        let unionWords = []
        let list_word_id = []

        const Recipes = this.RecipesData.map(recipe => new Recipe(recipe)) // formated JSON data
        let recipesWrapper =this.$recipesWrapper       
        let filteredRecipes = Recipes // initialize filteredRecipes, list of filtered recipes by words in searchbar 
        tagFilteredRecipes = filteredRecipes // initialize tagFilteredRecipes

        // Initialize lists of tags
        function createLists (recipes) {
            document.getElementById('ingredients-list2').innerHTML = createIngredientsSortedList(recipes);
            document.getElementById('appliance-list2').innerHTML = createApplianceSortedList(recipes);
            document.getElementById('ustensils-list2').innerHTML = createUstensilsSortedList(recipes);  
        }
        createLists(recipes)

        function createFilteredLists () {
            tagFilteredRecipes = filterSearch(listTag.join(' '), Recipes)
            var intersection = filteredRecipes.filter(value => tagFilteredRecipes.includes(value))
            showResult(intersection)
            createLists(intersection)
            
        }
        // Add tag button
        function addTag(element, type) {
            let btnType
            if (type === 'ingr') {btnType = 'btn-primary'}
            else if (type === 'appli') {btnType = 'btn-success'}
            else if (type === 'ust') {btnType = 'btn-danger'}
            let btn = `
            <div class="col w-30" id="${element.innerHTML}">
                <button type="button" class="btn ${btnType} text-truncate tagBtn" >
                    ${element.innerHTML} 
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
                `
            // Create list of HTML tags
            listTagBtn += btn
            listTag.push(element.innerHTML)
            //list_tag_id.push(element.innerHTML)
            document.getElementById('tag').innerHTML = listTagBtn

            listTag.forEach(t => document.getElementById(t).addEventListener('mousedown', (e) => {
            closeTagBtn(t)
            e.preventDefault()
            }))
        }
        // Close tag button
        function closeTagBtn (id) {
            // remove button in DOM
            document.getElementById(id).remove()
            // update list of buttons in DOM 
            listTagBtn = document.getElementById('tag').innerHTML 
            // remove from list of tags
            listTag = listTag.filter( (e) => {return e !== id})
            // filter and show filtered recipes + update list
            createFilteredLists()

            // remove choosen tag from lists
            list_tag_id = list_tag_id.filter( (e) => {return e !== "li-"+id})
            //list_tag_id.forEach(id =>document.getElementById(id).remove())

            unionWords = [...new Set([...list_word_id, ...list_tag_id])]
            unionWords.forEach(id => {
                if (document.getElementById(id))
                document.getElementById(id).remove() 
            })
            unionWords = []  
            
        }
        // Show cards (filtered) card recipes
        function showResult (filteredRecipes) {
            recipesWrapper.textContent = ''
            filteredRecipes.forEach(recipe => {
                const Template = new RecipeCard(recipe)
                recipesWrapper.appendChild(
                    Template.createRecipeCard()
                )
            })
        }

        // Add event listener to add button tag and launch new search if an element in the lists is clicked
        document.getElementById('ingredients-list2').addEventListener('click', function(event) {
            addTag(event.target, 'ingr')
            createFilteredLists()

            // remove choosen tag from lists
            list_tag_id.push('li-'+event.target.innerHTML);
            //list_tag_id.forEach(id =>document.getElementById(id).remove())
            unionWords = [...new Set([...list_word_id, ...list_tag_id])]
                    unionWords.forEach(id => {
                        if (document.getElementById(id))
                        document.getElementById(id).remove() 
                    }) 
            unionWords = []
            event.preventDefault    
        })
        document.getElementById('appliance-list2').addEventListener('click', function(event) {
            addTag(event.target, 'appli')
            createFilteredLists()

            // remove choosen tag from lists
            list_tag_id.push('li-'+event.target.innerHTML);
            //list_tag_id.forEach(id =>document.getElementById(id).remove())
            unionWords = [...new Set([...list_word_id, ...list_tag_id])]
                    unionWords.forEach(id => {
                        if (document.getElementById(id))
                        document.getElementById(id).remove() 
                    })
            unionWords = []
        })
        document.getElementById('ustensils-list2').addEventListener('click', function(event) {
            addTag(event.target, 'ust')
            createFilteredLists()

            // remove choosen tag from lists
            list_tag_id.push('li-'+event.target.innerHTML);
            //list_tag_id.forEach(id =>document.getElementById(id).remove())
            unionWords = [...new Set([...list_word_id, ...list_tag_id])]
                    unionWords.forEach(id => {
                        if (document.getElementById(id))
                        document.getElementById(id).remove() 
                    })
            unionWords = []
        })

        
        document.getElementById('searchIngr').addEventListener('input', () => {
            let searchValue = document.getElementById('searchIngr').value
            //save original list and restore at each new input before filter
            document.getElementById('ingredients-list2').innerHTML = createIngredientsSortedList(recipes);
            filterList (searchValue, 'ingr')
        })

        document.getElementById('searchAppli').addEventListener('input', () => {
            let searchValue = document.getElementById('searchAppli').value
            //save original list and restore at each new input before filter
            document.getElementById('appliance-list2').innerHTML = createApplianceSortedList(recipes);
            filterList (searchValue, 'appli')
        })

        document.getElementById('searchUst').addEventListener('input', () => {
            let searchValue = document.getElementById('searchUst').value
            //save original list and restore at each new input before filter
            document.getElementById('ustensils-list2').innerHTML = createUstensilsSortedList(recipes);
            filterList (searchValue, 'ust')
        })


        // Searchbar filter recipe on input and show result
        document.getElementById('searhBar').addEventListener('input', function (e) {
            let searchValue = document.getElementById('searhBar').value
            if (searchValue.length  > 2 || searchValue.length  < 3) { 
                //------------------- Start timer ----------------
                //const t0 = performance.now();
                //for (let i=0; i < 2000; i++){
                    filteredRecipes = filterSearch(searchValue, Recipes)
                    //document.getElementById('searhBar').value = " "
                //}
                //const t1 = performance.now();
                //console.log(`Call to filtrSearch took ${(t1 - t0)/2000} milliseconds in average.`);             
                //-------------------- End timer ---------------
                var intersection = filteredRecipes.filter(value => tagFilteredRecipes.includes(value))
                if (intersection.length === 0) {
                    document.getElementById('alert').style.display = 'inline-block'
                    document.getElementById('alert').innerHTML='Aucune recette ne correspond à votre recherche! Veuillez essayer autre chose.'
                    showResult(intersection)
                    createLists(intersection)
                }
                else {
                    document.getElementById('alert').innerHTML=''
                    document.getElementById('alert').style.display = 'none'
                    showResult(intersection)
                    createLists(intersection)
                }
                
                let searchWords = searchValue.toLowerCase().split(" ");
                list_word_id = []
                searchWords.forEach(w => {
                    if (document.getElementById('li-'+w)) {
                        //document.getElementById('li-'+w).remove();
                        
                        list_word_id.push('li-'+w)
                    }
                    unionWords = [...new Set([...list_word_id, ...list_tag_id])]
                    unionWords.forEach(id => {
                        if (document.getElementById(id))
                        document.getElementById(id).remove() 
                    })
                    unionWords = []  
                })
            }
        }) 
        showResult(filteredRecipes);    
    }
}

const app = new App()
app.main()



