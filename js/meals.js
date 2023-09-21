const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayShowMeals(data.meals));
};

const displayShowMeals = (meals) => {
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerText = "";
  for (const meal of meals) {
    // console.log(meal);
    const { strMeal, strMealThumb, idMeal } = meal;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card bg-base-100 shadow-md">
        <figure class="px-4 pt-4">
          <img src="${strMealThumb}" alt="" />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-2xl">${strMeal}</h2>
          <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <div class="card-actions">
            <a onclick="loadDetails(${idMeal})" href="#modalDetails" class="btn btn-primary text-white">Details</a>
          </div>
        </div>
      </div>
    `;
    mealsContainer.appendChild(div);
  }
};

const loadDetails = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDisplayModal(data.meals[0]));
};

const showDisplayModal = (details) => {
  const { strMeal, strMealThumb } = details;
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerText = strMeal;
  const modalImage = document.getElementById("modal-image");
  modalImage.innerHTML = `
    <img src="${strMealThumb}" alt="">
  `;
};

const searchMeals = () => {
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  inputField.value = "";
  loadMeals(searchText);
};

loadMeals("fish");
