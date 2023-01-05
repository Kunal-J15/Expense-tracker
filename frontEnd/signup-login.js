const base = "http://localhost:3000/user/";
const signIn = document.querySelector("#signIn");
const logIn = document.querySelector("#logIn");
const resDiv = document.querySelector("#res");
axios.defaults.headers.common['Athentication'] = localStorage.getItem("id");
if(signIn){
signIn.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const data = new FormData(signIn);
    let obj ={};
    for (const [name,value] of data) {
      obj[name] = value;
    }
    try {
        const res = await axios.post(base,obj);
        giveFeed(res.data);
        let url = window.location.href.split("/");
        url[url.length-1] = "login.html";
        window.location = url.join("/");
    } catch (error) {
        giveFeed(error.response.data);
    }
        
})
}
if(logIn){
logIn.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(logIn);
    let obj ={};
    for (const [name,value] of data) {
      obj[name] = value;
    }
    try {
        const res = await axios.post(base+"login",obj);
        console.log(res.data);
        localStorage.setItem("id",res.data.id)
        giveFeed(res.data.message);
        let url = window.location.href.split("/");
        url[url.length-1] = "expense.html";
        window.location = url.join("/");
    } catch (error) {
        console.log(error);
        giveFeed(error.response.data);
    }
})
}
function giveFeed(msg) {
    resDiv.innerText = msg;
    setTimeout(() => {
        resDiv.innerText="";
    }, 2000);
}