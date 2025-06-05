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
let  obj={
  name:"palki",
  amount:300,
  getBalance:function(){
      console.log(this);
      
  }
  // console.log(this);
  
  // getBalance:()={

  // }
}
obj.getBalance()