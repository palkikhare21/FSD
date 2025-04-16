//1...using prompt user inut and see if it is multiplr by 5

// let num=prompt("Enter a number");

// if (num%5===0){
//     console.log(num,"is multiple of 5");
// }
// else{
//     console.log(num,"is not multiple of 5");
    
// }

//2...givr grades to students

// let grade=81;
// if (grade===100){
//     grade='A';
// }else if (grade>=80){
//     grade="B";
// }
// else if (grade>=60){
//     grade='C';
// }else if (grade===50){
//     grade='D';
// }
// else{
//     grade='FAIL';
// }
// console.log(grade);

//8/4/25
//even num
// for (let num = 0; num<=100; num++) {
//     if(num%2===0){
//         console.log('num=',num);
        
//     }
// }
//2
// let marks=[85,97,44,37,76,60]
// let sum =0;

// for(let val of marks){
//     sum+=val;
// }
// console.log(sum);
// let avg= sum / marks.length;
// console.log(`avg marks of the class=${avg}`);

// let price=[250,645,300,900,50]

// for (let i=0;i<price.length;i++){
//     let offer=price[i]/10;
//     price[i] -=offer;
// }
// console.log(price);

// let num=[2,3,4,5,6,7];

// num.forEach((num) =>{
//     console.log(num * num);
    
// })   
// let arr = [97,90,95,34,54]

// let topper = arr.filter((val)=>{
//     return val>90;
// });
// console.log(topper);

let h2 = document.querySelector("h2");
console.dir(h2.innerText);
h2.innerText=h2.innerText + " from apan collaqge students";
