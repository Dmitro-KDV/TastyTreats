let debounce = require('lodash.debounce');

import {getArea, getIngredients, optionsArea, optionsIngredients} from "./search-api.js";
import {getRecipes} from "./search-recipes.js";
import {category} from "../category/category.js";

const form = document.querySelector('.search-form');
const inputForm = document.querySelector('.style-form');
const formIconSearch = document.querySelector('.form-icon-search');
const inputFormClose = document.querySelector('.saarch-form-btn-close');
const formTime = document.querySelector('.select-time');
const formArea = document.querySelector('.select-area');
const formIngredients = document.querySelector('.select-ingredients');
const formInputReset = document.querySelector('.form-icon-close');
const formReset = document.querySelector('.form-icon-x');
const galleryOops = document.querySelector('.gallery-oops');
const categoriesList = document.querySelector('.categories-list');
// const categoryItem = document.querySelectorAll('.category-item');



const selectTime = document.querySelector('.select-time');
const optionListTime = document.querySelector('.option-list-time');
const selectTimeSpan = selectTime.querySelector('.span');
const selectArea = document.querySelector('.select-area');
const optionListArea = document.querySelector('.option-list-area');
const selectAreaSpan = selectArea.querySelector('.span');
const selectIngredients = document.querySelector('.select-ingredients');
const optionListIngredients = document.querySelector('.option-list-ingredients');
const selectIngredientsSpan = selectIngredients.querySelector('.span');

let optionsTime = '';


selectTime.addEventListener('click', () =>{
  optionListTime.classList.toggle('active');
  selectTime.querySelector('.fa-angle-down').classList.toggle('fa-angle-up');
})


for (let i = 5; i <= 160; i+=5) {
    let option = document.createElement('div');
    option.classList.add('option');
    option.classList.add('option-time');
    option.id = i;    
    option.textContent = `${i} min`;
    optionListTime.appendChild(option);
    optionsTime = document.querySelectorAll('.option-time');
}

optionsTime.forEach((option) => {
  option.addEventListener('click', (e) => {

    // console.log(e.target.id)
    optionsTime.forEach((option) => {option.classList.remove('selected')});

    selectTime.querySelector('.span').innerHTML = option.innerHTML;
    selectTime.querySelector('.span').id = e.target.id;
    option.classList.add('selected');
    optionListTime.classList.toggle('active');
    selectTime.querySelector('.fa-angle-down').classList.toggle('fa-angle-up');
    form_searh();
  })
})


selectArea.addEventListener('click', () =>{
  optionListArea.classList.toggle('active');
  selectArea.querySelector('.fa-angle-down').classList.toggle('fa-angle-up');
})

async function choiceArea() {
  await optionsArea.forEach((option) => {
      option.addEventListener('click', (e) => {
    
        // console.log(e.target.innerHTML)
          optionsArea.forEach((option) => {option.classList.remove('selected')});
          selectArea.querySelector('.span').innerHTML = option.innerHTML;
          option.classList.add('selected');
          optionListArea.classList.toggle('active');
          selectArea.querySelector('.fa-angle-down').classList.toggle('fa-angle-up');
          form_searh();
      })
    })
}

selectIngredients.addEventListener('click', () =>{
  optionListIngredients.classList.toggle('active');
  selectIngredients.querySelector('.fa-angle-down').classList.toggle('fa-angle-up');
})

async function choiceIngredients() {
  await optionsIngredients.forEach((option) => {
      option.addEventListener('click', (e) => {
    
          optionsIngredients.forEach((option) => {option.classList.remove('selected')});
          selectIngredients.querySelector('.span').innerHTML = option.innerHTML;
          selectIngredients.querySelector('.span').id = e.target.id;
          option.classList.add('selected');
          optionListIngredients.classList.toggle('active');
          selectIngredients.querySelector('.fa-angle-down').classList.toggle('fa-angle-up');
          form_searh();
      })
    })
}

async function markupArea() {
  await getArea();
  await choiceArea();
  await getIngredients();
  await choiceIngredients();
}

markupArea();
 
 const debounceHandler = debounce(inputSaarch,300);

 inputForm.addEventListener('input', debounceHandler);

 inputForm.addEventListener('keydown', function(e) {
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    e.preventDefault();
  }
});

form.addEventListener('click', function(e) {
  e.preventDefault();
});

 function inputSaarch(evt) {
    evt.preventDefault();

    formIconSearch.style.stroke = '#9BB537';
    if (inputForm.value.length > 1) {
        inputFormClose.style.display = 'block';
    } else {
        inputFormClose.style.display = 'none';
        galleryOops.style.display = 'none';
    }
    form_searh();
 }

 formReset.addEventListener('click', form_Reset);

 form.addEventListener('change', form_searh);

 formInputReset.addEventListener('click', form_input);

 function form_input(evt) {
    evt.preventDefault(); 
    inputForm.value = '';
    inputFormClose.style.display = 'none';
    galleryOops.style.display = 'none';
    form_searh();
 }

const LOCALSTORAGE_KEY = "feedback-form-state";
const parsedSettings = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ?? {};

export let categoriy = '';

export function updateOutput() {
  // console.log("1  "+categoriy)
    if (parsedSettings) {
      const categoryItems = categoriesList.querySelectorAll('.category-item');
      categoryItems.forEach((option) => {
        if (option.dataset.category === parsedSettings.category) {
          option.classList.add('active');
          // categoriy = parsedSettings.category || "";
        } 
      });
      categoriy = parsedSettings.category || "";
      // console.log("2  "+categoriy)
      inputForm.value = parsedSettings.title || "";
      currentPage = parsedSettings.page || 1;
      selectTimeSpan.textContent = parsedSettings.timeT || "Select";
      selectTimeSpan.id = parsedSettings.timeId || "";
      selectAreaSpan.textContent = parsedSettings.area || "Select";
      selectIngredientsSpan.textContent = parsedSettings.ingredientT || "Select";
      selectIngredientsSpan.id = parsedSettings.ingredientId || "";
      // if (inputForm.value || formTime.value || formArea.value || formIngredients.value) {
        getRecipes();
      // }
    }
    if (inputForm.value.length > 1) {
        inputFormClose.style.display = 'block';
    }
}

export function form_searh(evt) {

    const formElements = {
        category: category,
        title: inputForm.value,
        page: currentPage,
        timeT: selectTimeSpan.textContent !== 'Select' ? selectTimeSpan.textContent : '',
        timeId: selectTimeSpan.textContent !== 'Select' ? selectTimeSpan.id : '',
        area: selectAreaSpan.textContent !== 'Select' ? selectAreaSpan.textContent : '',
        ingredientT: selectIngredientsSpan.textContent !== 'Select' ? selectIngredientsSpan.textContent : '',
        ingredientId: selectIngredientsSpan.textContent !== 'Select' ? selectIngredientsSpan.id : '',
      }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formElements));
    getRecipes();
 }


 function form_Reset() {
    inputForm.value ='';
    selectAreaSpan.textContent = 'Select';
    selectIngredientsSpan.id = '';
    selectIngredientsSpan.textContent = 'Select';
    selectTimeSpan.id = '';
    selectTimeSpan.textContent = 'Select';
    inputFormClose.style.display = 'none';
    galleryOops.style.display = 'none';
    form_searh();
 }
