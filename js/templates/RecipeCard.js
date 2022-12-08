class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe
    }
    createRecipeCard() {
        const $wrapper = document.createElement('div')
        //$wrapper.classList.add('recipe-card-wrapper')
        $wrapper.classList.add('col')

        const movieCard = `
                <div class="card" style="height: 400px; overflow: hidden;">
                    <img src="./assets/no-image-png-2.png" class="card-img-top" height="200px" alt="Image" style="background-color: grey; object-fit: contain;">
                    <div class="card-body overflow-hidden pb-3 bg-light ">
                        <div class="d-flex flex-row" style="justify-content: space-between;">
                            <h5 class="card-title text-truncate" >${this._recipe.name}</h5>
                            <div class="d-flex flex-row flex-nowrap align-middle text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock mx-1" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                                <span class="card-title">${this._recipe.time}</span>
                            </div>
                        </div>
                        <HR width="90%" class="my-1">
                        <div class="d-flex flex-row flex-nowrap overflow-hidden" height="50px">
                            <div class="card-text w-50 overflow-hidden">
                                ${this._recipe.ingredientsDOM}
                            </div>
                            <p class="card-text px-0.5 w-50">${this._recipe.description}</p>
                        </div>
                    </div>
                </div>
        `        
        $wrapper.innerHTML = movieCard
        return $wrapper
    }
}
