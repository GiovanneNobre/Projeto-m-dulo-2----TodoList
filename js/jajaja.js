async function createTodoItem(){
  let novoItem = {
    id: items.length + 1,
    descricao: document.getElementById('novoItem').value,
    completo: false
  }

  let response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
        name: novoItem.descricao,
        owner:'Giovanne'
    })
  })

  itemCriado = await response.json()

  adicionarItem(itemCriado)
}

async function loadTodoItems(){
  let response = await fetch('http://localhost:3000/api/todos')
  let todoItems = await response.json()

  todoItems.forEach(todoItem => {
    adicionarItem(todoItem)
  })
}

async function deleteTodoItems(id){
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE"
  })
}

async function searchTodoItems(id){
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "GET"
  })
}

function marcarComoCompletado(item, completo) {
  item.completo = completo
  items[item.id - 1] = item
  localStorage.setItem('items', JSON.stringify(items))
}

function adicionarItem(novoItem) {
  console.log(novoItem)

  let itemsList = document.getElementById('lista')
  let itemElement = document.createElement('li')

  let itemText = document.createElement('p')
  itemText.innerText = novoItem.name

  let completarCheckbox = document.createElement('input')
  completarCheckbox.setAttribute('type', 'checkbox')
  completarCheckbox.checked = novoItem.done

  completarCheckbox.addEventListener('change', () => {
    if (completarCheckbox.checked) {
      itemText.style.textDecoration = 'line-through'
    } else {
      itemText.style.textDecoration = 'none'
    }

    marcarComoCompletado(novoItem, completarCheckbox.checked)
  })

  
  let removerButton = document.createElement('button')
  removerButton.innerText = 'Apagar'

  removerButton.addEventListener('click', () => {
    console.log(`Apagando item id: ${novoItem.id}`)
    deleteTodoItems(novoItem.id)
    itemElement.remove()
  })

  let receberButton = document.createElement('button')
  receberButton.innerText = 'Buscar ID'

  receberButton.addEventListener('click', () => {
    console.log(`Filtrando somente o id: ${novoItem.id}`)
  })


  itemText.appendChild(completarCheckbox)
  itemText.appendChild(removerButton)
  itemText.appendChild(receberButton)
  itemElement.appendChild(itemText)
  itemsList.appendChild(itemElement)
}