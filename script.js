

const addbtn = document.getElementById('btnadd');
let todos = [];

let oldtodo = localStorage.getItem('todos');
if (oldtodo != null) {
    todos = JSON.parse(oldtodo);
}

document.onload = display();
addbtn.addEventListener('click', add);

let editindex = null;
function add() {
    const title = document.getElementById('txttasktitle').value;
    const description = document.getElementById('txttaskdescription').value;
    if (title === '') {
        alert("please enter task title");
        return false;
    }
    if (description === '') {
        alert("please enter task description");
        return false;
    }
    if (editindex != null) {
        todos[editindex].title = title;
        todos[editindex].description = description;
        localStorage.setItem('todos', JSON.stringify(todos));
        editindex = null;
    }
    else {
        document.getElementById('btnadd').innerText = "Add Task";
        todos.push({ 'title': title, 'description': description });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    display();
    document.getElementById('btnadd').innerText = "Add Task";
    document.getElementById('txttasktitle').value = "";
    document.getElementById('txttaskdescription').value = "";
}

function display() {
    let tablebody = document.getElementById('tablebody');
    tablebody.innerHTML = '';
    todos.forEach((data, index) => {
        tablebody.innerHTML += `<tr class="text-center">
        <td class="w-25">${data.title}</td>
        <td class="w-50">${data.description}</td>
        <td>
            <button class="btn btn-outline-primary" id="edit" onclick="edit(${index})">Edit</button>
            <button class="btn btn-outline-danger" id="delete" onclick="remove(${index})">Delete</button>
        </td>
      </tr>`;
    })
}

function remove(index) {
    if (!confirm("are you sure to delete task?")) {
        return false;
    }
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    display();
}

function edit(index) {
    editindex = index;
    document.getElementById('txttasktitle').value = todos[index].title;
    document.getElementById('txttaskdescription').value = todos[index].description;
    document.getElementById('btnadd').innerText = "update";
}
