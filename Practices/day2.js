
let arr=[1,2,3,4,5,6,7,8]


// for(let i of arr){
//     console.log(i);
    
// }

// let data = arr.forEach((c,b,a)=>{
//     console.log(b);
    
// })

let data1 = arr.map((a,b,c)=>{
    console.log(a);
    
})

console.log(data1==arr); //map creates a new arr so the address are not same
