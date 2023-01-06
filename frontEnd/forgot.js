const forgot = document.querySelector("#forgot");
const passUrl = "http://localhost:3000/password/";
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
            console.log(res.data);
            localStorage.setItem("token",JSON.stringify(res.data));
            giveFeed(res.data.message);
        } catch (error) {
            console.log(error);
            giveFeed(error.response.data);
        }
    })
    }