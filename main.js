var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
const totalDis = document.getElementById('total')
const baseUrl = "https://crudcrud.com/api/891e4d1bda0f47eeb01aacf3f6e72c04/data/";
window.addEventListener("DOMContentLoaded",loadItems);
var total =0;

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);

//...............Create...........................
function addItem(e){
  e.preventDefault();
  let val = document.getElementById('val').value;
  const des = document.getElementById('des').value;
  const cat = document.getElementById('cat').value;
  store(val,des,cat);
}
async function store(val,des,cat){
  let data = await axios.post(baseUrl,{val,des,cat});
  console.log(data.data);
  append([data.data]);
}

//...............Read...........................
async function loadItems(){
  let data = await axios.get(baseUrl);
  append(data.data);
}

//...............Update...........................
async function edit(e){
  e.preventDefault();
  const val = e.target.firstElementChild.value;
  const des = e.target.firstElementChild.nextSibling.value;
  const cat = e.target.firstElementChild.nextSibling.nextSibling.value;
  const _id = e.target.parentElement.classList[1];
  e.target.parentElement.remove();
  await axios.put(baseUrl+_id,{val,des,cat})
  addListner();
  append([{val,des,cat,_id}]);
}
//...............Delete...........................
async function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      let li = e.target.parentElement;
      total-= parseInt(li.firstChild.textContent);
      await axios.delete(baseUrl+li.classList[1]);
      itemList.removeChild(li);
      totalDis.innerText = "Total Expense: "+total;
    }
  }else  if(e.target.classList.contains('edit')){
    removeListner();
   
    let li = e.target.parentElement;
    total-=parseInt(li.firstChild.textContent);
    console.log(parseInt(li.firstChild.textContent),total);
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

//..................................Utils.......................
function append(data){
  for(let {val,des,cat,_id} of data){
    const li = document.createElement('li');
    li.className = 'list-group-item '+ _id;
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
    total+=parseInt(val);
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
