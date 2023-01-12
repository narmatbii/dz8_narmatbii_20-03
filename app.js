const url = 'http://localhost:8000/todos'



const addValue = document.querySelector('.add-value')
const addBtn = document.querySelector('.add')
const todoList = document.querySelector('.list')





async function getAllTodo(url) {
    try {
        const response = await fetch(url)
        const todos = await response.json()
        showTodo(todos)
    } catch (error) {
        console.log(error.message)
    }
}







function showTodo(todos) {
    todos.forEach(todo => {
        const todoBlock = document.createElement('div')
        todoBlock.innerHTML = `
            <div class='todo-item'>
            <h2 class=${todo.completed && 'done'}>${todo.title}</h2>
            <button onclick='updateTodo(${todo.id},${todo.completed})'>Done</button>
            <button onclick='deleteTodo(${todo.id})'>Delete</button>
            </div>
        `
        todoList.append(todoBlock)
    })
}






getAllTodo(url)

async function deleteTodo(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

async function updateTodo(id,status) {
    try {
        await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: !status
            })
        })
    } catch (error) {
        console.log(error.message)
    }
}

addBtn.onclick=(() => {
    const titleUser = addValue.value
    async function addTodo(titleUser) {
        try {
            await fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: false,
                    title: titleUser,
                })
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    addTodo(titleUser)
})