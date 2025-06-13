// var a =5
// function sum(){
//     let b=10;
//     let c=20
//     console.log(a+b+c);
    
// }
// sum()
// console.log(a);

// let arr=[
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
// ]
// let data=arr[0].map((value,index)=>{
//     return arr.reduce((sum,row)=>{
//       return sum+row[index]
//     },0)
// })
// console.log(data);
// console.log(a);
// var a=5

// sum()
// var sum=()=>{
//   console.log("helllloooo");
  
// }

// let a=5
// a()
// var a=1;
// function foo(){
//   console.log(a);
//   var a=2;
  
// }
// foo();
// hoistTest();
// var hoistTest=function (){
//   console.log("hoisted?");
  
// };
// if(false){
//   var a=5;
// }
// console.log(a);
// function sum(fn){
//   fn()
// }
// sum(function inner (){
//   console.log("inner");
  
// })
// let  obj={
//   name:"palki",
//   amount:300,
//   getBalance:function(){
//       console.log(this);
      
//   }
//   // console.log(this);
  
//   // getBalance:()={

//   // }
// }
// obj.getBalance()
// let a=5; //jo data declare hota hai var ke sath unka sdata jata hai window ke pass
// let obj={
//   name:"palki",
//   // a:44,
//   amount:3000,
//   getBalance:()=>{
//     console.log(this.a);
    
//   }
// }
// obj.getBalance()
//prototype
// let obj={
//   id:1,
//   name:"palki"
// }
// // console.log(obj.lastname); //undefine
// console.log(obj.__proto__);

// let str="Hello"
// console.log(str.toLowerCase());
// Array.prototype.myfilter=function(cb){
//     console.log(cb);

//     for(let i=0;i<this.length;i++){
//         if(cb(this[i],i,this)){
//             return this [i]
//         }
//     }
//     return undefined
    
// }
// let data= Array.myfilter( (a,b,c)=>{
//         return a==5
// })
// console.log(data);

// let arr1=[1,2,3,4,5,6,7,8,9,10]
// Array.prototype.myReduce=function(cb,initialValue){
//     let acc=initialValue
//     for(let i=0;i<this.length;i++){
//         acc=cb(acc,this[i])
//     }
//     return acc

// }
// let sum=arr1.myReduce((a,b)=>{
//     return a+b
// },0)
// // console.log(sum);

// let arr1=[1,2,3,4];
// Array.prototype.myReduce=function(callback,context){
//     for (let i=0;i<this.length;i++){
//         if(this.indexOf(this[i])>-1){
//             callback.call(context, this[i],i,this);
//         }
//     }
// }
// console.log(arr1);

//call apply bind
// let obj={
// id:1,
// firstname:"palki",
// lastname:"khare",
// getFullName:function(age,isPass){
//     console.log(this.name+"  "+this.lastname+ "  "+age +" "+isPass);
    
// }

// }
// let obj1={
//     id:2,
//     name:"sakshi",
//     lastname:"jasiwal"
// }
// obj.getFullName.call(obj1,[22,true])
// obj.getFullName.apply(obj1,[22,true])

// function user(userName,lastname){
//      this.userName=this.userName,
//      this.lastName=this.lastName
// }
// let data= new user("rahul","jain")
// let data1= new user("palki","khare")
// console.log(data);
// console.log(data1);


// let data = user()//output isma store kiya hai isiliye undefine hai
// console.log(data);
// let data = new user()//created a construtor
// console.log(data);


// console.log(user());
//web api
// setTimeout(()=>{
//      console.log("hellooo");
     
// },0)
// setTimeout(()=>{
//      console.log("bye");
     
// },10)
// console.log("hiiii");
//  for(let i=1;i<=5;i++)
// setTimeout(() => {
//      console.log(i);
     
     
// },i*1000);
   

// setTimeout(() => {
     
// }, timeout);(()=>{
//      console.log(2);
     
// },1)
// setInterval(()=>{
//      console.log(3);
     
// },2)
// console.log("stop");
//let block scope hota hai uski value block ke bhr lag amni jati hai
//var global variable hota hai uski value change ho jati hai
// function print(){
//      setTimeout(()=>{

//      },1000)
//      for(var i=1;i<=5;i++){
//           console.log(i);
          
//      }
// }

// let arr=[1,2,3,4,5]
// for(var i=0;i<=arr.length;i++){
//      setTimeout(()=>{
//           console.log(arr[i]);
          
//      },1000*i)
     
// }
let step1= function(){
  return new Promise((res,rej)=>{
     setTimeout(()=>{
          res("select photo")
     },5000)
  })
}
let step2= function(){
  return new Promise((res,rej)=>{
     setTimeout(()=>{
          res("filterr")
     },4000)
  })
}
// //call back hell=>promise=>async await
// step1().then((data)=>{
//      console.log(data);
//      return step2()
     
// }).then((filterr)=>{
//      console.log(filterr);
     
// })

async function call(){
     let data= await step1()
     console.log(data);
     let data1=await step2()
     console.log(data1);
     
     
}
call()