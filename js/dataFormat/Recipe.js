class Recipe {
    constructor(data) {
        this._id = data.id
        this._name = data.name
        this._servings = data.servings
        this._ingredients = data.ingredients
        this._time = data.time
        this._description = data.description
        this._appliance = data.appliance
        this._ustensils = data.ustensils
    }
    get id() {
        return this._id
    }
    get name() {
        return this._name
    }
    get servings() {
        return this._servings
    }
    get ingredientsDOM() {
        let listIngr=''
        const igds = this._ingredients
         
        igds.forEach(i => {
            let unit=''
            let quant=''
            if (typeof i.unit !== "undefined") {unit= i.unit};
            if (typeof i.quantity !== "undefined") {quant= ': '+i.quantity}; 
            listIngr+='<p class="my-0 px-1"><b>'+i.ingredient+'</b>'+quant+' '+unit+'</p>'
        });
        return listIngr
    }
    get ingredients() {
        return this._ingredients
    }
    get time() {
        const timeMin = this._time + 'min'
        return timeMin
    }
    get description() {
        return this._description
    }
    get appliance() {
        return this._appliance
    }
    get ustensils() {
        return this._ustensils
    }
}

