import Notiflix from 'notiflix';
const axios = require('axios').default;
import {createMarkup} from "../recipe/recipe.js";
import {category} from "../category/category.js";
import {categoriy} from "./search.js";

const gallery = document.querySelector(".recipe__card--list");
const galleryOops = document.querySelector('.gallery-oops');
const inputForm = document.querySelector('.style-form');
const formTime = document.querySelector('.select-time');
const formArea = document.querySelector('.select-area');
const formIngredients = document.querySelector('.select-ingredients');
const selectTime = document.querySelector('.select-time');
const selectArea = document.querySelector('.select-area');
const selectIngredients = document.querySelector('.select-ingredients');
const selectTimeSpan = selectTime.querySelector('.span');
const selectAreaSpan = selectArea.querySelector('.span');
const selectIngredientsSpan = selectIngredients.querySelector('.span');

let currentPage = 1;
const url_recipes = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

export function getRecipes() {
    // console.log(`${category} || ${categoriy}`)
    axios.get(url_recipes
        ,{
        params: {
            category: category || categoriy,
            title: inputForm.value,
            page: currentPage,
            limit: 9,
            area: selectAreaSpan.textContent !== 'Select' ? selectAreaSpan.textContent : '',
            ingredient: selectIngredientsSpan.textContent !== 'Select' ? selectIngredientsSpan.id : '',
            time: selectTimeSpan.textContent !== 'Select' ? selectTimeSpan.id : '',
        }
    }
    )
    .then((response) => {
        if (response.statusText!=='OK') {
            throw new Error(response.status);
        }
        const recipes = response.data.results;

        if (recipes.length > 0) {
            createMarkup(recipes);
            galleryOops.style.display = 'none';
        } else {
            Notiflix.Notify.failure('Oops! Nothing found');
            gallery.innerHTML = '';
            galleryOops.style.display = 'flex';
        }
    })
    .catch(function(error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}