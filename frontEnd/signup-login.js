const base = "http://localhost:3000/user/";
const signIn = document.querySelector("#signIn");
const logIn = document.querySelector("#logIn");
const resDiv = document.querySelector("#res");
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
        giveFeed(res.data);

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
        let url = window.location.href.split("/");
        url[url.length-1] = "expense.html";
        window.location = url.join("/");
    }, 2000);
}