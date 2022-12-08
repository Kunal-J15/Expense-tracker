var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
loadItems()


form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);


function addItem(e){
  e.preventDefault();
  let val = document.getElementById('val').value;
  const des = document.getElementById('des').value;
  const cat = document.getElementById('cat').value;

  append(val,des,cat);
}


function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      let li = e.target.parentElement;
      removeStore(li.classList[1]);
      itemList.removeChild(li);
    }
  }else  if(e.target.classList.contains('edit')){
    removeListner();
   
    let li = e.target.parentElement;
 
    let str=li.firstChild.nextSibling.textContent;
 
    li.innerHTML = `<form id="editForm" class="form-inline mb-3"> <input type="number" class="form-control mr-2" value=${parseInt(li.firstChild.textContent)}><input type="text" class="form-control mr-2" value='${str}'><select name="cat" id="cat">
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


function edit(e){
    e.preventDefault();
    const val = e.target.firstElementChild.value;
    const des = e.target.firstElementChild.nextSibling.value;
    const cat = e.target.firstElementChild.nextSibling.nextSibling.value;
    const cName = e.target.parentElement.classList[1];
    e.target.parentElement.remove();
    append(val,des,cat,cName,true);
}
function append(val,des,cat,load=localStorage.length,edit){
  if(!val) val=0;
  if(!des) des = "Nothing to Describe";
    const li = document.createElement('li');
    li.className = 'list-group-item '+ load;
    li.appendChild(document.createTextNode(val+" : "));
    li.appendChild(document.createTextNode(des+"  "));
    const div = document.createElement('div');
    div.className = 'btn btn-info btn-sm ml-2';
    div.appendChild(document.createTextNode(cat));
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
    
    if(typeof(load)=="number"){
      addListner();
      store(val,des,cat,load);
    }
    if(edit) addListner();
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
function store(val,des,cat,i){
  while(localStorage.getItem(i))i++;
  localStorage.setItem(i,JSON.stringify({val,des,cat}));
}
function loadItems(){
  for(let i=0;i<localStorage.length;i++){
    let key =localStorage.key(i);
    let arr = Object.values(JSON.parse(localStorage.getItem(key)));
    append(...arr,key);
  }
}
function removeStore(i){
localStorage.removeItem(i);
}
