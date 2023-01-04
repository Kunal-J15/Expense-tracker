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
        giveFeed(error.response.data);
    }
})
function giveFeed(msg) {
    resDiv.innerText = msg;
    setTimeout(() => {
        resDiv.innerText=""
    }, 2000);
}