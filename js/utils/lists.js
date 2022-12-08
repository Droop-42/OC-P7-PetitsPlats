/*************** List ingredient, appliance, ustensil section ***************/


function createIngredientsSortedList (recipes) {
  const ingredientL = []
  recipes.forEach(recipe => {
    recipe.ingredients.forEach( ingredient_desc => ingredientL.push(ingredient_desc.ingredient))
  })
  const ingredientsList = Array.from(new Set(ingredientL.map(u => u.toLowerCase()))).sort()

  sortedListDOM=''
  ingredientsList.forEach(ingr => {
    sortedListDOM += `
      <li id="li-${ingr}">
        <a class="dropdown-item ingr-item" href="#">${ingr}</a>
      </li>
      `
  })
  return sortedListDOM
}

function createApplianceSortedList (recipes) {
  const applianceL = [] // no need let!
  recipes.forEach(recipe => applianceL.push(recipe.appliance.toLowerCase()))
  const applianceList = Array.from(new Set(applianceL)).sort()

  sortedList=''
  applianceList.forEach(appli => {
    sortedList += `
    <li id="li-${appli}">
      <a class="dropdown-item appli-item" href="#">${appli}</a>
    </li>
    `})
  return sortedList
}

function createUstensilsSortedList (recipes) {
  let ustensilsL = [] // need a let!
  recipes.forEach(recipe => {
    ustensilsL = ustensilsL.concat(recipe.ustensils)
  })
  const ustensilsList = Array.from(new Set(ustensilsL.map(u => u.toLowerCase()))).sort()

  sortedList=''
  ustensilsList.forEach(ust => {
    sortedList += `
    <li id="li-${ust}">
      <a class="dropdown-item ust-item" href="#">${ust}</a>
    </li>
    `})
  return sortedList
}

function filterList (input, type) {
  let listElm = []
  let filtered = []
  let listToFilter = document.querySelectorAll('a.'+type+'-item')
  console.log('a.'+type+'-item')
  
  listToFilter.forEach(i => {
    listElm.push(i.innerHTML)
  })
  filtered = listElm.filter( el => {
    return el.indexOf(input) == -1
  })
  filtered.forEach( el => {
    document.getElementById('li-'+el).remove()
  })
  
}

document.getElementById('btn-lists').addEventListener('click', (e) => {
  //document.getElementById('searchIngr').focus();
  const l2 = document.getElementById('ingredients-list2');
  const btnL = document.getElementById('btn-lists')

  if (btnL.getAttribute("expanded") == 'false') {
      l2.style.display = "block";
      btnL.style.width = '30rem';
      btnL.style.borderRadius = '7px 7px 0 0';
      btnL.setAttribute( "expanded", "true" );
  }
  else if (btnL.getAttribute("expanded") == 'true') {
      if (e.target.id == 'searchIngr') {
        return 0
      } else {
        l2.style.display = "none";
      btnL.style.width = '200px';
      btnL.style.borderRadius = '7px 7px 7px 7px';
      btnL.setAttribute( "expanded", "false" );
      }
      
  }
})

document.getElementById('btn-lists2').addEventListener('click', (e) => {
  //document.getElementById('searchIngr').focus();
  const l2 = document.getElementById('appliance-list2');
  const btnL = document.getElementById('btn-lists2')

  if (btnL.getAttribute("expanded") == 'false') {
      l2.style.display = "block";
      btnL.style.width = '30rem';
      btnL.style.borderRadius = '7px 7px 0 0';
      btnL.setAttribute( "expanded", "true" );
  }
  else if (btnL.getAttribute("expanded") == 'true') {
    if (e.target.id == 'searchAppli') {
      return 0
    } else {
      l2.style.display = "none";
      btnL.style.width = '200px';
      btnL.style.borderRadius = '7px 7px 7px 7px';
      btnL.setAttribute( "expanded", "false" );
    }
  }
})  

document.getElementById('btn-lists3').addEventListener('click', (e) => {
  //document.getElementById('searchIngr').focus();
  const l2 = document.getElementById('ustensils-list2');
  const btnL = document.getElementById('btn-lists3')

  if (btnL.getAttribute("expanded") == 'false') {
      l2.style.display = "block";
      btnL.style.width = '30rem';
      btnL.style.borderRadius = '7px 7px 0 0';
      btnL.setAttribute( "expanded", "true" );
  }
  else if (btnL.getAttribute("expanded") == 'true') {
    if (e.target.id == 'searchUst') {
      return 0
    } else {
      l2.style.display = "none";
      btnL.style.width = '200px';
      btnL.style.borderRadius = '7px 7px 7px 7px';
      btnL.setAttribute( "expanded", "false" );
    }
  }
})
