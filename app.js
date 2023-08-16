// Get items
const alert = document.querySelector('.alert');
const form = document.querySelector('.shopping-form');
const shoppingItem = document.getElementById('shopping-input-item');
const container = document.querySelector('.shopping-list-container');
const list = document.querySelector('.shopping-list');
const addBtn = document.querySelector('.add-btn');
const resetBtn = document.querySelector('.reset-btn');

// Editing variables
let editingItem;
let isEditing = false;
let editID = '';

// Helper functions
const getRandomID = () => {
  return new Date().getTime().toString();
};

const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1500);
};

const addItem = (e) => {
  e.preventDefault();
  const value = shoppingItem.value;
  const id = getRandomID();

  if (value && !isEditing) {
    console.log('Add item to the list.');
  } else if (value && isEditing) {
    console.log('Editing.');
  } else {
    displayAlert('Please enter a value.', 'danger');
  }
};

// Submit form
form.addEventListener('submit', addItem);
