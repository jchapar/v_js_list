const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')
const clearBtn = document.querySelector('#clear')
const formBtn = itemForm.querySelector('button')
const itemFilter = document.getElementById('filter')
let isEditMode = false

// Display Items
function displayItems() {
  const itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.forEach((item) => addItemToDOM(item))
  checkUI()
}

// Add Item
function onAddItemSubmit(e) {
  e.preventDefault()

  const newItem = itemInput.value

  // Validate input
  if (newItem === '') {
    alert('Please add an item')
    return
  }

  // Check edit mmode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode')

    removeItemFromStorage(itemToEdit.textContent)

    itemToEdit.classList.remove('edit-mode')

    itemToEdit.remove()

    isEditMode = false
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item exists')
      return
    }
  }

  // Add Item to dom
  addItemToDOM(newItem)

  // Save to LS
  addItemToStorage(newItem)
  // Check UI
  checkUI()

  itemInput.value = ''
}

// Add item to DOM
function addItemToDOM(item) {
  // Create List item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))

  const button = createButton('remove-item btn-link text-red')
  li.appendChild(button)

  itemList.appendChild(li)
}

// Create Button
function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

// Create button icon
function createIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}

// LS Add
function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.push(item)

  // Convert to JSON string and set to LS
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

// Get Items from LS
function getItemsFromStorage() {
  let itemsFromStorage

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }

  return itemsFromStorage
}

// On click item
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement)
  } else {
    setItemToEdit(e.target)
  }
}

// Check if item exists
function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage()
  return itemsFromStorage.includes(item)
}

// Set item to edit mode
function setItemToEdit(item) {
  isEditMode = true

  itemList.querySelectorAll('li').forEach((i) => {
    i.classList.remove('edit-mode')
  })

  item.classList.add('edit-mode')
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
  formBtn.style.backgroundColor = 'blue'
  itemInput.value = item.textContent
}

// Remove Items
function removeItem(item) {
  if (confirm('Are You Sure?')) {
    // Remove item from DOM
    item.remove()

    // Remove item from LS
    removeItemFromStorage(item.textContent)

    checkUI()
  }
}

// Remove from Storage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage()

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  // Reset to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

// Clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  // Clear from LS
  localStorage.removeItem('items')

  checkUI()
}

// Filter Item
function filterItems(e) {
  const items = itemList.querySelectorAll('li')
  const text = e.target.value.toLowerCase()

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase()

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

// Check UI for items
function checkUI() {
  itemInput.value = ''

  const items = itemList.querySelectorAll('li')
  if (items.length === 0) {
    clearBtn.style.display = 'none'
    itemFilter.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    itemFilter.style.display = 'block'
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
  formBtn.style.backgroundColor = '#333'

  isEditMode = false
}

// Initialize App
function init() {
  //////////////////////////// Event Listeners //////////////////////////////
  itemForm.addEventListener('submit', onAddItemSubmit)
  itemList.addEventListener('click', onClickItem)
  clearBtn.addEventListener('click', clearItems)
  clearBtn.addEventListener('click', clearItems)
  itemFilter.addEventListener('input', filterItems)
  document.addEventListener('DOMContentLoaded', displayItems)
}

// Init
init()
