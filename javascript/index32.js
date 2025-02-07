// function a(a){
//      console.log('helllo');

//      return function(b){
//         console.log('hiii');
//         return function(c){
//             console.log('byeee');
//             console.log(a+b+c);
            
            
//         }
        
//      }
     
// }
// let b=a()
// b()
// a(5)(10)(5)

// function sum(a){
//     return function(b){      
//         if(b) return sum(a+b)
//             return a
//     }
// }
// console.log(sum(1)(2)(3)(4)(5)());

let arr=[1,2,3,4,5,65,7]

const max = arr.reduce((a, b) =>
     Math.max(a, b));

