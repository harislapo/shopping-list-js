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

// Helper functions.
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
  isEditing = false;
  editID = '';
  addBtn.textContent = 'Add';
};
const getLocalStorage = () => {
  return localStorage.getItem('shopping-list')
    ? JSON.parse(localStorage.getItem('shopping-list'))
    : [];
};

// Main functions.
const addItem = (e) => {
  e.preventDefault();
  const value = inputItem.value;
  const id = getRandomID();

  // Adding an item.
  if (value && !isEditing) {
    // Create new article element
    const item = document.createElement('article');

    // Add class to the newly created element.
    item.classList.add('shopping-list-item');

    // Initialize attribute to be added to the element
    // and set it to the randomly generated id.
    const attribute = document.createAttribute('data-id');
    attribute.value = id;

    // Add atribute to the element.
    item.setAttributeNode(attribute);

    // Add HTML dynamically to the article element.
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

    // Initialize buttons when the item is added to the DOM so we can actually use them.
    const deleteBtn = item.querySelector('.delete-btn');
    const editBtn = item.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // Append the article to the list and display an success alert
    list.appendChild(item);
    displayAlert('Item added to the list!', 'success');

    // Dynamically add class that changes visibility of list
    container.classList.add('show-container');

    // Add to local storage.
    addToLocalStorage(id, value);

    // Reset input to empty
    setToDefaultValue();
    // Editing an item.
  } else if (value && isEditing) {
    // Set the value of the currently editing item to the newly inserted value from the input box.
    editingItem.innerHTML = value;

    displayAlert('Value changed!', 'success');

    // Edit local storage
    editLocalStorage(editID, value);

    setToDefaultValue();
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
  setToDefaultValue();
  localStorage.removeItem('shopping-list');
};

const deleteItem = (e) => {
  // Get an item's position in DOM.
  const element = e.currentTarget.parentElement.parentElement;
  // Get an item's id from its dataset.
  const id = element.dataset.id;
  // Add timeout to mimick API call.
  setTimeout(() => {
    // Remove it from the DOM.
    list.removeChild(element);
    // Check if the deleted item was the last item in the list remaining.
    // If it is, hide container.
    if (list.children.length === 0) {
      container.classList.remove('show-container');
    }
  }, 600);
  displayAlert('Item removed!', 'success');
  setToDefaultValue();
  removeFromLocalStorage(id);
};

const editItem = (e) => {
  // Get an item's position in DOM.
  const element = e.currentTarget.parentElement.parentElement;

  // Get element's id.
  editID = element.dataset.id;

  // Initialize the item that we want to change its value.
  // .parentElement = div'btn-container', .previousElementSibling = div'title'.
  editingItem = e.currentTarget.parentElement.previousElementSibling;

  // Get its value and initialize it to the form input value.
  inputItem.value = editingItem.innerHTML;

  // Set editing flag to true.
  isEditing = true;

  // Change button's text from 'Add' to 'Edit'.
  addBtn.textContent = 'Edit';
};

// Local storage.
const addToLocalStorage = (id, value) => {
  const item = { id, value };
  let items = getLocalStorage();
  items.push(item);
  localStorage.setItem('shopping-list', JSON.stringify(items));
};
const removeFromLocalStorage = (id) => {
  let items = getLocalStorage();

  items = items.filter((item) => item.id !== id);
  localStorage.setItem('shopping-list', JSON.stringify(items));
};
const editLocalStorage = (id, value) => {
  let items = getLocalStorage();

  // Iterate through items in local storage array
  items = items.map((item) => {
    if (item.id === id) {
      // If found, edit its value to the new value
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('shopping-list', JSON.stringify(items));
};

// Event handlers
form.addEventListener('submit', addItem);
resetBtn.addEventListener('click', resetItems);
