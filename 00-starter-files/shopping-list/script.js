const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')
const clearBtn = document.querySelector('#clear')
const itemFilter = document.getElementById('filter')

// Add Item
function addItem(e) {
  e.preventDefault()

  const newItem = itemInput.value

  // Validate input
  if (newItem === '') {
    alert('Please add an item')
    return
  }

  // Create List item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(newItem))

  const button = createButton('remove-item btn-link text-red')
  li.appendChild(button)

  itemList.appendChild(li)

  checkUI()

  itemInput.value = ''
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

// Remove Items
function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()
      checkUI()
    }
  }
}

// Clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
    checkUI()
  }
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
  const items = itemList.querySelectorAll('li')
  if (items.length === 0) {
    clearBtn.style.display = 'none'
    itemFilter.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    itemFilter.style.display = 'block'
  }
}

//////////////////////////// Event Listeners //////////////////////////////
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)

// Init
checkUI()
