const search =document.getElementById('search');
const submit =document.getElementById('submit');
const categories =document.getElementById('meal-container');
const resultHeading =document.getElementById('result');
const single_meal =document.getElementById('single');

function searchName (e){
    e.preventDefault();
    resultHeading.innerHTML="";
    const searchValue =search.value;
    if (searchValue.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then((res) => res.json())
        .then((data)=>{
            // console.log(data);
            resultHeading.innerHTML=`<h3>search results for '${searchValue}':</h3>`
            if (data.meals === null){
                resultHeading.innerHTML=`<p> there are no search results .try again!`
            }else{
                categories.innerHTML=data.meals
                .map(sum=>`
                <div class="cook">
                    <div class="meal-info" data-info="${sum.idMeal}">
                    <img src='${sum.strMealThumb}' alt='${sum.strMeal}'/>
                    <h3>'${sum.strMeal}'</h3>
                    </div>
                </div>
                `)
            }
        });
    search.value="";
    } else{
        alert('please enter a search Name')
    }
};

function mealById(Api) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Api}`)
    .then((res) => res.json())
    .then((data) => {
    const clicking = data.meals[0];
    dataBase(clicking);
    });
};

function dataBase(clicking) {
    const PopularMeal = [];
    for (let i = 1; i <= 20; i++) {
      if (clicking[`strIngredient${i}`]) {
        PopularMeal.push(
          `${clicking[`strIngredient${i}`]}-${clicking[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    };
    single_meal.innerHTML = `
    <div class="single-meal">
      <h1>${clicking.strMeal}</h1>
      <img src="${clicking.strMealThumb}" alt="${clicking.strMeal}"/>
        <div class="single-meal-info">
            ${clicking.strArea ? `<p>${clicking.strArea}</p>` : ""}
        </div>
      <div class="main">
          <h1>PopularMeal</h1>
          <ul>
              ${PopularMeal.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
      </div>
    </div>`;
}

submit.addEventListener('submit',searchName);

categories.addEventListener("click", (e) => {
    const Contact = e.path.find((item) => {
      if (item.classList) {
        return item.classList.contains("meal-info");
      } else {
        return false;
      }
    });
    if (Contact) {
      const during = Contact.getAttribute("data-info");
      mealById(during);
    }
});
