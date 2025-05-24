
// let arr=[1,2,3,4,5,6,7,8]


// for(let i of arr){
//     console.log(i);
    
// }

// let data = arr.forEach((c,b,a)=>{
//     console.log(b);
    
// })

// let data1 = arr.map((a,b,c)=>{
//     console.log(a);
    
// })

// console.log(data1==arr); //map creates a new arr so the address are not same

// let data = arr.filter((a,b,c)=>{
//     return a>3
    
// })
// console.log(data);

// let data1 = arr.reduce((a,b,c)=>{
//     return a>b?a:b
// })
// console.log(data1);

// let arr = [2,3,2,3,42,4,32,5,2,5,7]

// let data = arr.filter((a,b,c)=>{
//     return a>2
// })
//  let data1=data.filter((a)=>{
//     return a%2==0
// })
// let sum = arr.reduce((a,b,c,d)=>{
//     return a+b
    
// })
// console.log(data);
// console.log(data1);

 
// console.log(sum);

// let arr = [0,20,30]

// function convertTemps(array){
//     return arr*(9/5)+32
// }
// console.log();
//2nd max value
//another array in dono ko compare n which has lagerest value
let arr=[1,2,3,4,5,6,7,8]
// console.log(arr.includes(3));
// console.log(arr.indexOf(100));


// let data=arr.find((a,b,c)=>{
//     return a==3
// })
// console.log(data);
// let data1=arr.filter((a,b,c)=>{
//     return a==3
// })
// let maxValue = arr.reduce((a,b,c)=>{
//     return a>b?a:b
// })
// let Newarr = arr.filter((a,b,c)=>{
//     return a!==maxValue
// })
// let secondMax = Newarr.reduce((a,b,c)=>{
//     return a>b?a:b
// })

// console.log(maxValue);
// console.log(Newarr);
// console.log(secondMax);
// let arr1=[1,2]
// let merge=[]
// for(let i of arr){
//     merge.push(i)
   
// }
//  console.log(merge);

let str = " javascript is awesome!";
console.log("original string '"+ str + "'");

//1.
console.log("length",str.length);//includes space
//2. trim
console.log("trimmed",str.trim());//remove space

//3.
console.log("uppercase",str.toUpperCase());
//4,
console.log("lowercase",str.toLowerCase());
//5.
console.log("includes 'awesome:",str.includes("awesome"));
//6.
console.log("starts with ' java'",str.startsWith(" java"));
//7.
console.log("ends with '! ':",str.endsWith(!" "));
//8.indexof
console.log("'Index of 'is':",str.indexOf("is"));
//9lastindexof
console.log("last index of 'a':",str.lastIndexOf("a"));
//10 charat
console.log("character at index 5:",str.charAt(5));
//11 substracting from index 2 to 10
console.log("substracting (2,10):",str.substring(2,10));
//12 slice
console.log("slice(2,-1):",str.slice(2,-1));
//13 split
console.log("split by space:",str.trim().split(" "));
//14  replace 
// console.log("replace 'awesome" with 'powerfull':");
//15 






























