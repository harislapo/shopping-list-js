// Get items
const alert = document.querySelector('.alert');
const form = document.querySelector('.shopping-form');
const inputItem = document.getElementById('shopping-input-item');
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

const setToDefaultValue = () => {
  inputItem.value = '';
};

// Main functions
const addItem = (e) => {
  e.preventDefault();
  const value = inputItem.value;
  const id = getRandomID();

  // Adding an item
  if (value && !isEditing) {
    // Create new article element
    const item = document.createElement('article');

    // Add class to the newly created element
    item.classList.add('shopping-list-item');

    // Initialize attribute to be added to the element
    // and set it to the randomly generated id
    const attribute = document.createAttribute('data-id');
    attribute.value = id;

    // Add atribute to the element
    item.setAttributeNode(attribute);

    // Add HTML dynamically to the article element
    item.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
    `;

    // Initialize buttons when the item is added to the DOM.
    const deleteBtn = item.querySelector('.delete-btn');
    const editBtn = item.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // Append the article to the list and display an success alert
    list.appendChild(item);
    displayAlert('Item added to the list!', 'success');

    // Dynamically add class that changes visibility of list
    container.classList.add('show-container');

    // Reset input to empty
    setToDefaultValue();
  } else if (value && isEditing) {
    console.log('Editing.');
  } else {
    displayAlert('Please enter a value.', 'danger');
  }
};

// Clear shopping list.
const resetItems = () => {
  // Get all added items.
  const items = document.querySelectorAll('.shopping-list-item');
  if (items.length > 0) {
    // Remove them all.
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  // Hide the container.
  container.classList.remove('show-container');
  displayAlert('List reseted!', 'danger');
};

const deleteItem = () => {
  console.log('Item deleted!');
};

const editItem = () => {
  console.log('Item edited!');
};

// Event handlers
form.addEventListener('submit', addItem);
resetBtn.addEventListener('click', resetItems);
