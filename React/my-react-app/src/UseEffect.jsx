// import React, { useEffect, useState } from 'react'

// const App = () => {
//   let [count,SetCount]=useState(0)
//   let [city,SetCity]=useState("delhi")


//   // console.log("hellloo");
//   // fetch('https://dummyjson.com/products').then((res)=>{
//   //   return res.json()

//   // }).then(())


//   useEffect(()=>{
//     async  function apiCall(){
//       let data=   await   fetch('https://dummyjson.com/products')
//           let res=      await data.json()
//       console.log(res);
//    }
//    apiCall()

//   },[count])



  
//   return (
//     <div>
//       <h3>{count}</h3>
//       <h4>{city}</h4>
//       <button onClick={()=>SetCity('bhopal')}>city</button>
//         <button onClick={()=>SetCount(count+1)}>++</button>
//     </div>
//   )
// }

// export default UseEffect
// import React ,{UseEffect, useState} from 'react'

// const UseEffect = () => {
//     let [count,SetCount]= useState(0)
//   let [city,SetCity]= useState("delhi")


//   console.log("hellloo");
// //   fetch('https://dummyjson.com/products').then((res)=>{
// //     return res.json()

// //   }).then(())
//   UseEffect(()=>{
//         async  function apiCall(){
//           let data=   await   fetch('https://dummyjson.com/products')
//               let res=      await data.json()
//           console.log(res);
//        }
//        apiCall()
    
//       },[count])
//   return (
//     <div>
//       <h3>{count}</h3>
//        <h4>{city}</h4>
//        <button onClick={()=>SetCity('bhopal')}>city</button>
//          <button onClick={()=>SetCount(count+1)}>++</button>
//     </div>
//   )
// }

// export default UseEffect
