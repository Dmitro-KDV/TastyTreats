import Notiflix from 'notiflix';
import {updateOutput} from "./search.js";

const axios = require('axios').default;

const url_areas = 'https://tasty-treats-backend.p.goit.global/api/areas';
const url_ingredients = 'https://tasty-treats-backend.p.goit.global/api/ingredients';

const selectArea = document.querySelector('.select-area');
const optionListArea = document.querySelector('.option-list-area');
const selectIngredients = document.querySelector('.select-ingredients');
const optionListIngredients = document.querySelector('.option-list-ingredients');

export let optionsArea = '';
export let optionsIngredients = '';

export async function getArea() {
    await axios.get(url_areas)
    .then((response) => {
        if (response.statusText!=='OK') {
            throw new Error(response.status);
        }

        let area = [];

        for (let i = 0; i < response.data.length; i++) {
            area.push(response.data[i].name)
        }

        area.sort((a, b) => a.localeCompare(b));

        for (let i = 0; i < area.length; i++) {

            let option = document.createElement('div');
            option.classList.add('option');
            option.classList.add('option-area');
            option.innerHTML = `${area[i]}`;
            optionListArea.appendChild(option);
            optionsArea = document.querySelectorAll('.option-area');
        }
    })
    .catch(function(error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

export async function getIngredients() {
    await axios.get(url_ingredients)
    .then((response) => {
        // if (response.statusText!=='OK') {
        //     throw new Error(response.status);
        // }
        let ingredients = [];
        for (let i = 0; i < response.data.length; i++) {
            ingredients.push({name: response.data[i].name,
                              id: response.data[i]._id})
        }

        ingredients.sort((firstStudent, secondStudent) =>
        firstStudent.name.localeCompare(secondStudent.name));

        for (let i = 0; i < ingredients.length; i++) {

            let option = document.createElement('div');
            option.classList.add('option');
            option.classList.add('option-ingredients');
            option.id = ingredients[i].id;  
            option.innerHTML = `${ingredients[i].name}`;
            optionListIngredients.appendChild(option);
            optionsIngredients = document.querySelectorAll('.option-ingredients');
        }
        updateOutput();
    })
    .catch(function(error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}
