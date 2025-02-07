// everything in a js is a object 
// dot property is used whrn there is a object

// let obj={
//     id:1,
//     name:"hello"
// }
// console.log(obj.__proto_._proto_,"hehehe");
// console.log(obj.map(),"hehehe");

// console.log(obj.toString());
// console.log(obj.id);
// console.log(obj.fullname);

// let arr=[1,2,3,4,5]
// arr.map(()=>{

// })
// console.log(arr.__proto__.__proto__,"dekho");

// Array.prototype.myMap=function(callback){

//     let newArr=[]
//     for(let i=0;i<this.length;i++){
//         newArr.push(callback(this[i],i,this))
//     }
//     return newArr
// }

// let arr=[1,2,3,4,5]
// let data=arr.myMap((a,b,c)=>{
//     return a+2
// })
// console.log(data,"datata");


// Array.prototype.myFilter=function(callback){
//     let newArr=[]
//     for(let i=0;i<this.length;i++){
//         if(callback(this[i],i,this)){
//             newArr.push(this[i])
//         }
//     }
//     return newArr
// }
// let arr=[1,2,3,45,6,67]
// let data=arr.myFilter((a)=>{
//     return a>2
// })
// console.log(data);

// const promise = new Promise(function C(resolve, reject) {
//     console.log(1);
//     setTimeout(function D() {
//         console.log("timerStart");
//         resolve("success"); 
//         console.log("timerEnd");  
//     }, 0);
//     console.log(2);
// });

// promise.then(function f(res) {
//     console.log(res);
// });

// setTimeout(function E() {
//     console.log("Are!!");
// }, 0);

// console.log(4);

// console.log("Start");

// setTimeout(() => {
//     console.log("setTimeout");
// }, 0);

// Promise.resolve().then(() => {
//     console.log("Promise");
// });

// console.log("End");

// console.log("X");

// setTimeout(() => {
//     console.log("Y");
// }, 0);

// Promise.resolve().then(() => {
//     console.log("Z");
//     setTimeout(() => {
//         console.log("A");
//     }, 0);
// });

// console.log("B");


// console.log("A");

// setTimeout(() => {
//     console.log("B");
// }, 0);

// Promise.resolve().then(() => {
//     console.log("C");
//     return Promise.resolve("D");
// }).then((res) => {
//     console.log(res);
// });

// console.log("E");

// console.log("1");

// const promise = new Promise((resolve) => {
//     console.log("2");
//     setTimeout(() => {
//         console.log("3");
//         resolve();
//     }, 0);
// });

// promise.then(() => {
//     console.log("4");
// });

// console.log("5");

console.log("1");

const promise = new Promise((resolve) => {
    console.log("2");
    setTimeout(() => {
        console.log("3");
        resolve();
        for(let i=0;i<5;i++){
            console.log('hellooo');
            
        }
    }, 0);
});

promise.then(() => {
    console.log("4");
});

console.log("5");   //loop will work first after then the .then function