const search =document.getElementById('search');
const submit =document.getElementById('submit');
const mealsId =document.getElementById('meals');
const resultHeading =document.getElementById('result-heading');
const single_meal =document.getElementById('single-meal');

function searchMeal (e){
    e.preventDefault();
    resultHeading.innerHTML="";
    const term =search.value;
    console.log(term);
    if (term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then((res) => res.json())
        .then((data)=>{
            console.log(data);
            resultHeading.innerHTML=`<h3>search results for '${term}':</h3>`
            if (data.meals === null){
                resultHeading.innerHTML=`<p> there are no search results .try again!`
            }else{
                mealsId.innerHTML=data.meals
                .map(meal=>`
                <div class="meal">
                <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                <h3>'${meal.strMeal}'</h3>
                </div>
                `)
            }
        });
    search.value="";
    } else{
        alert('please enter a search Name')
    }
}
submit.addEventListener('submit',searchMeal)