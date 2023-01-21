var base = "http://ec2-44-203-193-188.compute-1.amazonaws.com/user/";
// base =  "http://localhost:3000/user/";
const signIn = document.querySelector("#signIn");
const logIn = document.querySelector("#logIn");
const resDiv = document.querySelector("#res");
axios.defaults.headers.common['Athentication'] = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).id;
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
        localStorage.setItem("token",JSON.stringify(res.data));
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
function giveFeed(msg,time=2000) {
    resDiv.innerText = msg;
    setTimeout(() => {
        resDiv.innerText="";
    }, time);
}