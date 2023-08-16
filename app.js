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

    // Append the article to the list and display an success alert
    list.appendChild(item);
    displayAlert('Item added to the list!', 'success');

    // Dynamically add class that changes visibility of list
    container.classList.add('show-container');
  } else if (value && isEditing) {
    console.log('Editing.');
  } else {
    displayAlert('Please enter a value.', 'danger');
  }
};

// Submit form
form.addEventListener('submit', addItem);
