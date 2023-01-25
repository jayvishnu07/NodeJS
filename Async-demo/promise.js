const p1 = new Promise((res,rej)=>{
    setTimeout(()=>{
        console.log('Asynchronous function 1...');
        rej(new Error("problem"));
        // res(1);
    },3000)
});

const p2 = new Promise((res,rej)=>{
    setTimeout(()=>{
        console.log('Asynchronous function 2...');
        res(2);
    },2000)
});

Promise.race([p1,p2]).then(res=>console.log(res)).catch(err=>console.log('Error',err.message))