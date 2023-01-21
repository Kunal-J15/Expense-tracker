const forgot = document.querySelector("#forgot");
var passUrl = core + "password/" ;
console.log(passUrl);
//passUrl="http://localhost:3000/password/";
if(forgot){
    forgot.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const data = new FormData(forgot);
        let obj ={};
        for (const [name,value] of data) {
          obj[name] = value;
        }
        try {
            const res = await axios.post(passUrl+"forgot",obj);
            giveFeed(res.data.message,100000);
        } catch (error) {
            console.log(error);
            giveFeed(error.response.data);
        }
    })
    }