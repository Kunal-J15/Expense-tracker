  var posts = [ {tittle:"post 1",body:"This is post 1",createdAt:Date.now()},
    {tittle:"post 2",body:"This is post 2",createdAt:Date.now()},
    ];

    const obj ={user:"John",lastActivity:Date.now()};

    function  getPost(){
        setTimeout(() => {
            
            let output ="";
            document.body.innerHTML=output;
            for (const post of posts) {
                output += `<li>${post.tittle} created : ${Math.trunc((Date.now()-post.createdAt)/1000)} sec ago</li>`
            }
            document.body.innerHTML+=output;
        }, 1000);
    }

    function createPost(post,callback){
        setTimeout(() => {
            posts.push({...post,createdAt:Date.now()});
            callback();
        }, 2000);
    }

    function createPostPromise(post){
        return new Promise((res,rej)=>{
            console.log("before creating "+post.tittle+" user last activity => " + new Date(obj.lastActivity));
        setTimeout(() => {
            posts.push({ ...post,createdAt:Date.now()});
            console.log("After creating "+post.tittle+" user last activity is" + new Date(obj.lastActivity));
            res();
        }, 2000);
    });
    }
    function updateLastUserActivityTime(){ return new Promise((resolve, reject) => {
        setTimeout(() => {
            // console.log("a");
            obj.lastActivity = Date.now();
            resolve();
        }, 2000);
    }) }

    function create4thPost(call){
        return call({tittle:"post 4",body:"This is post 4"});
    }
  
    function lastEditedInSecondsAgo(){
        setInterval(getPost, 1000);
    }
    lastEditedInSecondsAgo();
     
    async function deletePost(){
        return new Promise((resolve,rej)=>{setTimeout(() => {
            let a = posts.pop();
            if(!a) rej("Array is empty now.");
            console.log(...posts);
            resolve();
        }, 1000)
    });
    }
    Promise.all([updateLastUserActivityTime(),createPostPromise({tittle:"post 3",body:"This is post 3"})]) 
                                                            .then(()=>deletePost())
                                                            .then(()=>{ return Promise.all([updateLastUserActivityTime(),createPostPromise({tittle:"post 4",body:"This is post 4"})])})
                                                            .then(()=>deletePost())
                                                            .then(()=>deletePost())
                                                            .then(()=>deletePost())
                                                            .then(()=>deletePost())
                                                            .catch((e)=>console.log(e))
                                                            

const prom1 = Promise.resolve("Hello World");
const prom2 = 10;
const prom4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(60);
    }, 4000);
})
const prom3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(15);
    }, 4000);
})

// const vals = Promise.all([prom1,prom2,prom3,prom4]).then((values)=>console.log(values));


