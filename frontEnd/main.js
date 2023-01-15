var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
const fileList = document.getElementById('files');
const totalDis = document.getElementById('total');
const pagi = document.querySelector("#pagi");
const perPage = document.querySelector("#perPage");
const baseUrl = "http://localhost:3000/expense/";
const primiumUrl = "http://localhost:3000/primium/";

window.addEventListener("DOMContentLoaded", loadItems);
var total = 0;
perPage.onsubmit= e=>{
 e.preventDefault();

 if(localStorage.getItem("perPage")!= e.target.per.value){
  localStorage.setItem("perPage",e.target.per.value);
  loadPageData()
 } 
}
if(localStorage.getItem("perPage")){
  const op = document.getElementById(localStorage.getItem("perPage"));
  op.selected = true;
}
pagi.onclick = (e) => {
  if (e.target.id && e.target.className == "page-link ") {
    loadPageData(e.target.id);
  }
}

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);

//...............Create...........................
function addItem(e) {
  e.preventDefault();
  let value = document.getElementById('value').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  store(value, description, category);
}
async function store(value, description, category) {
  try {
    let data = await axios.post(baseUrl, { value, description, category });
    append([data.data]);
  } catch (error) {

    console.log(error.status);
  }
}

//...............Read...........................
async function loadItems() {
  try {
    localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).isPrimium && primiumFeatures();
    const val = await loadPageData(1);
    appendFileList(val);
  } catch (error) {
    console.log(error);
    if (error.response.status === 401);
    let url = window.location.href.split("/");
    url[url.length - 1] = "login.html";
    window.location = url.join("/");
  }

}

async function loadPageData(num) {
  itemList.innerHTML = "";
  total=0;
  let data = await axios.get(baseUrl + "?page=" + num+"&perPage="+localStorage.getItem("perPage"));
  pagination(parseInt((data.data[0].count) % data.data[3]) ? parseInt((data.data[0].count) / data.data[3]) + 1 : parseInt((data.data[0].count) / data.data[3]), parseInt(data.data[2]));
  append(data.data[0].rows);
  return data.data[1]; //used in loadItems to appendFileList
}

//...............Update...........................
async function edit(e) {
  try {
    e.preventDefault();
    const value = e.target.firstElementChild.value;
    const description = e.target.firstElementChild.nextSibling.value;
    const category = e.target.firstElementChild.nextSibling.nextSibling.value;
    const id = e.target.parentElement.classList[1];
    e.target.parentElement.remove();
    await axios.put(baseUrl + id, { value, description, category })
    addListner();
    append([{ value, description, category, id }]);

  } catch (error) {
    console.log(error);
  }

}
//...............Delete...........................
async function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {
      try {
        let li = e.target.parentElement;
        total -= parseInt(li.firstChild.textContent);
        await axios.delete(baseUrl + li.classList[1]);
        itemList.removeChild(li);
        totalDis.innerText = "Total Expense: " + total;

      } catch (error) {
        console.log(error);
      }

    }
  } else if (e.target.classList.contains('edit')) {
    removeListner();

    let li = e.target.parentElement;
    total -= parseInt(li.firstChild.textContent);
    console.log(parseInt(li.firstChild.textContent), total);
    let str = li.firstChild.nextSibling.textContent;

    li.innerHTML = `<form id="editForm" class="form-inline mb-3"> <input type="number" class="form-control mr-2" value=${parseInt(li.firstChild.textContent)}><input type="text" class="form-control mr-2" value='${str}'><select name="category" id="category">
    <option value="fuel" ${li.firstChild.nextSibling.nextSibling.textContent == "fuel" && "Selected"}>Fuel</option>
    <option value="food"  ${li.firstChild.nextSibling.nextSibling.textContent == "food" && "Selected"}>Food</option>
    <option value="electricity" ${li.firstChild.nextSibling.nextSibling.textContent == "electricity" && "Selected"}>Electricity</option>
    <option value="Movie" ${li.firstChild.nextSibling.nextSibling.textContent == "Movie" && "Selected"}>Movie</option>
    <option value="other" ${li.firstChild.nextSibling.nextSibling.textContent == "other" && "Selected"}>other</option>
  </select><hr> <input type="submit" class="btn btn-dark" value="Submit"></form>`;
    let editForm = document.getElementById('editForm');
    editForm.addEventListener("submit", edit);
  }

}

//..................................Utils.......................
async function paymentHandler(e) {
  const token = localStorage.getItem("token");
  let response = await axios.get(primiumUrl);
  response = response.data;
  var options = {
    "key": response.key_id, // Enter the Key ID generated from the Dashboard
    "order_id": response.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": async function (response) {
      try {
        await axios.post(primiumUrl + "success", response);
        alert("You are primium user now");
        primiumFeatures();
      } catch (error) {
        console.log(response);
        console.log(error);
      }

    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', async function (response) {
    axios.post(primiumUrl + "fail", response.error.metadata);
    alert(response.error.description);
  });

  rzp1.open();
  e.preventDefault();
}

async function leadBoard(e) {
  try {
    const data = (await axios.get(primiumUrl + "leadboard"));
    const leadDiv = document.getElementById("leadDiv");
    console.log(leadDiv.style.display);
    if (!leadDiv.style.display) return leadDiv.style.display = "none";
    leadDiv.style = "";
    const ol = document.getElementById("lead");
    ol.innerHTML = "";
    let i = 1;
    for (const user of data.data) {
      const li = document.createElement("li");
      li.innerHTML = `<span>${i}.  </span> <span>${user.name} </span> <span> ${user.total}</span>`;
      li.className = "list-group-item list-group-item-info"
      ol.appendChild(li);
      i++;
    }
  } catch (error) {
    console.log(error);
  }


}
document.getElementById("rzp-button1").onclick = paymentHandler;

function primiumFeatures() {
  document.getElementById("primium").innerText = "You are Primium user"
  document.getElementById("rzp-button1").innerText = "Leadboard"
  document.getElementById("rzp-button1").onclick = leadBoard;
  const report = document.getElementById("report");
  report.style.display = "";
  report.onclick = async () => {
    const data = await axios.get(primiumUrl + "download");
    const a = document.createElement("a");
    a.href = data.data;
    a.download = "myexpense.csv"
    a.click();
  }
}
function pagination(count, page) {
  let LIs = ""
  for (let e = -1; e <= 1; e++) {

    if ((e == -1 && page == 1) || (e == 1 && page == count)) continue
    LIs += `<li class="page-item  ${page + e == page && 'active'}"><i class="page-link ${e == 0 && 'btn disabled'}" id="${page + e}" >${page + e}</i></li>`;
  }
  const inner = `<li class="page-item">
  <i class="page-link ${page == 1 ? 'btn disabled' : ''}" id="${page - 1}" aria-label="Previous"  > &laquo;
  </i>
</li>
${LIs}
<li class="page-item">
  <i class="page-link ${page == count ? 'btn disabled' : ''}" id="${page + 1}" aria-label="Next" >
    &raquo;
  </i>
</li>`

  pagi.innerHTML = inner;

}
function append(data) {

  for (let { value, description, category, id } of data) {
    const li = document.createElement('li');
    li.className = 'list-group-item ' + id;
    li.appendChild(document.createTextNode(value + " : "));
    li.appendChild(document.createTextNode(description + "  "));
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
    total += parseInt(value);
  }
  totalDis.innerText = "Total Expense: " + total;

}
function appendFileList(data) {
  for (let { link, id, createdAt } of data) {
    const li = document.createElement('li');
    li.className = 'list-group-item ' + id;

    const a = document.createElement("a");
    a.href = link;
    a.innerText = createdAt;
    a.download = "myexpense.txt";
    li.appendChild(a);


    fileList.appendChild(li);
  }
}
function addListner() {
  form.addEventListener('submit', addItem);
  itemList.addEventListener('click', removeItem);
  let elements = form.elements;
  for (let e of elements) e.readOnly = false;
  let options = document.querySelectorAll(".opt")
  for (const e of options) e.disabled = false;
}

function removeListner() {
  form.removeEventListener('submit', addItem);
  function doNothing(e) { e.preventDefault() }
  form.addEventListener('submit', doNothing);
  itemList.removeEventListener('click', removeItem);
  let elements = form.elements;
  for (let e of elements) e.readOnly = true;
  let options = document.querySelectorAll(".opt")
  for (const e of options) e.disabled = true;
}
