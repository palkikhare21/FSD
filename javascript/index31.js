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

Array.prototype.myMap=function(callback){

    let newArr=[]
    for(let i=0;i<this.length;i++){
        newArr.push(callback(this[i],i,this))
    }
    return newArr
}

let arr=[1,2,3,4,5]
let data=arr.myMap((a,b,c)=>{
    return a+2
})
console.log(data,"datata");


