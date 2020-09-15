
var list = document.getElementById("list");



firebase.database().ref('todos').on('child_added',function(data){
    // console.log(data.val())

// Create li tag with text node
var li = document.createElement('li')
var liText = document.createTextNode(data.val().value)
li.appendChild(liText)

// delet button create
var delBtn = document.createElement("button")
var delText = document.createTextNode("DELETE")
delBtn.setAttribute("class","btn")
delBtn.setAttribute('id',data.val().key)
delBtn.setAttribute("onclick","deleteItem(this)")
delBtn.appendChild(delText)

//Edit Button Create
var editBtn = document.createElement("button");
var editText =  document.createTextNode("Edit")
editBtn.appendChild(editText)
editBtn.setAttribute('id',data.val().key)
editBtn.setAttribute("class","btn")
editBtn.setAttribute("onclick","editItem(this)")
li.appendChild(editBtn)

li.appendChild(delBtn)

list.appendChild(li)

})


// li create 
function addTodo() {
    var todo_item = document.getElementById("todo-item");
var database = firebase.database().ref('todos');
var key = database.push().key;
var todo = {
    value :todo_item.value,
    key: key
}
database.child(key).set(todo)
todo_item.value = "";
}


// edit item
function editItem(e){
    var val = e.parentNode.firstChild.nodeValue;
    var val = prompt("Enter Edit Value", val)
    var editTodo = {
    value : val,
    key: e.id
}
firebase.database().ref('todos').child(e.id).set(editTodo)
e.parentNode.firstChild.nodeValue = val;

}


 // delet item
 function deleteItem(e) {
     firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
    todo_item.value = "";
}



//delet All
function deleteAll () {
    firebase.database().ref('todos').remove()
    list.innerHTML = "";
}
