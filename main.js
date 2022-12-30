var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
const totalDis = document.getElementById('total')
const baseUrl = "http://localhost:3000/expense/";
window.addEventListener("DOMContentLoaded",loadItems);
var total =0;

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);

//...............Create...........................
function addItem(e){
  e.preventDefault();
  let value = document.getElementById('value').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  store(value,description,category);
}
async function store(value,description,category){
  try {
    let data = await axios.post(baseUrl,{value,description,category});
    append([data.data]);
  } catch (error) {
   console.log(error); 
  }
}

//...............Read...........................
async function loadItems(){
  try {
    let data = await axios.get(baseUrl);
    console.log("inside loadItems");
    append(data.data);
  } catch (error) {
    console.log(error);
  }
 
}

//...............Update...........................
async function edit(e){
  try {
    e.preventDefault();
  const value = e.target.firstElementChild.value;
  const description = e.target.firstElementChild.nextSibling.value;
  const category = e.target.firstElementChild.nextSibling.nextSibling.value;
  const id = e.target.parentElement.classList[1];
  e.target.parentElement.remove();
  await axios.put(baseUrl+id,{value,description,category})
  addListner();
  append([{value,description,category,id}]);
    
  } catch (error) {
    console.log(error);
  }
  
}
//...............Delete...........................
async function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      try {
        let li = e.target.parentElement;
      total-= parseInt(li.firstChild.textContent);
      await axios.delete(baseUrl+li.classList[1]);
      itemList.removeChild(li);
      totalDis.innerText = "Total Expense: "+total;
        
      } catch (error) {
        console.log(error);
      }
      
    }
  }else  if(e.target.classList.contains('edit')){
    removeListner();
   
    let li = e.target.parentElement;
    total-=parseInt(li.firstChild.textContent);
    console.log(parseInt(li.firstChild.textContent),total);
    let str=li.firstChild.nextSibling.textContent;
 
    li.innerHTML = `<form id="editForm" class="form-inline mb-3"> <input type="number" class="form-control mr-2" value=${parseInt(li.firstChild.textContent)}><input type="text" class="form-control mr-2" value='${str}'><select name="category" id="category">
    <option value="fuel" ${li.firstChild.nextSibling.nextSibling.textContent=="fuel"&&"Selected" }>Fuel</option>
    <option value="food"  ${li.firstChild.nextSibling.nextSibling.textContent=="food"&&"Selected" }>Food</option>
    <option value="electricity" ${li.firstChild.nextSibling.nextSibling.textContent=="electricity"&&"Selected" }>Electricity</option>
    <option value="Movie" ${li.firstChild.nextSibling.nextSibling.textContent=="Movie"&&"Selected" }>Movie</option>
    <option value="other" ${li.firstChild.nextSibling.nextSibling.textContent=="other"&&"Selected" }>other</option>
  </select><hr> <input type="submit" class="btn btn-dark" value="Submit"></form>`;
    let editForm = document.getElementById('editForm');
    editForm.addEventListener("submit",edit);
    }
 
}

//..................................Utils.......................
function append(data){
  for(let {value,description,category,id} of data){
    const li = document.createElement('li');
    li.className = 'list-group-item '+ id;
    li.appendChild(document.createTextNode(value+" : "));
    li.appendChild(document.createTextNode(description+"  "));
    const div = document.createElement('div');
    div.className = 'btn btn-info btn-sm ml-2';
    div.appendChild(document.createTextNode(category));
    li.appendChild(div);
   
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete ml-2';
    deleteBtn.appendChild(document.createTextNode('X'));
    li.appendChild(deleteBtn); 
  
    const eBtn = document.createElement('button');
    eBtn.className = 'btn btn-warning btn-sm float-right edit';
    eBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(eBtn);
    itemList.appendChild(li);
    total+=parseInt(value);
  }
  totalDis.innerText = "Total Expense: "+total;

}

function addListner(){
  form.addEventListener('submit', addItem);
  itemList.addEventListener('click', removeItem);
  let elements = form.elements;
  for(let e of elements) e.readOnly= false;
  let options = document.querySelectorAll(".opt")
  for (const e of options) e.disabled =false;
}
function removeListner(){
  form.removeEventListener('submit', addItem);
  function doNothing(e){e.preventDefault()}
  form.addEventListener('submit', doNothing);
  itemList.removeEventListener('click', removeItem);
  let elements = form.elements;
  for(let e of elements) e.readOnly= true;
  let options = document.querySelectorAll(".opt")
  for (const e of options) e.disabled =true;
}
