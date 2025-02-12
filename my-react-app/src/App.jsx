//functional => static  vs class=> dynamic
// import { useState } from "react";
// const App= () =>{
//   let [count,SetCount]=useState(0)

//   function fun1(){
//     SetCount(count+1)
//   }
//   return(
//     <div>
//       <button onClick={fun1}>click:{count}</button>
//     </div>
//   )
// }
// export default App

// import { useState } from "react";
// const App= () =>{
//   let [color,SetColor]=useState('black')


//   function fun1(){
//     if(color){
//     SetColor(false)
//   }
//   else{
//     SetColor(true)
//   }
    
//   }
//   return(
//     <div style={{backgroundColor:color?'black':"blue",height:'100vh'}}>
//       <button onClick={fun1}>click:{color}</button>
//     </div>
//   )
// }



// export default App


// import React ,{useState} from 'react'

// const App = () => {

//   let [input,SetInput]= useState()
//   let[data,Setdata]=useState([])

//     function fun1(e){
//     console.log('heheh')
//     SetInput(e.target.value)
//   }
//   function done(){
//     Setdata([...data,input])
//     SetInput('')
//   }

//   function d(id){
//     // console.log(id,"kyayaya");
//     let newA= data.filter((val,index)=>{
//       return index!==id
//     })
//   Setdata(newA) 
//   }
//   return (
//     <div>
//       {/* {<h3>{data}</h3>} */}
//       {
//         data.map((a,i)=>{
//           return(<div>
//             <li>{a}</li>
//             <button onClick={()=>d(i)}>delete</button>
//             </div>)
//         })
        
//       }
// <input type='text'onChange={fun1} placeholder='Enter input'></input>
// <button onClick={done}>add</button>
//     </div>
//   )
// }

// export default App

// import React, { useState } from 'react'

// const App = () => {
//   let [input,SetInput]=useState({
//     name:'',
//     email:'',
//     password:''

//   })
//   function fun1(e){
//     let {name,value}=e.target
//     SetInput({...input,[name]:value})
//     console.log(input,"helloe");
    
//   }
//   return (
//     <div>
//       {/* <h2>{input}</h2> */}
//       <input type='text' name='name' value={input.name} onChange={fun1} placeholder='enter your name' />
//       <br />
//       <br />
//       <input type="text" name='email' value={input.email} onChange={fun1} placeholder='enter your email' />
//       <br />
//       <br />
//       <input type="text" name='password' value={input.password} onChange={fun1} placeholder='enter your password' />
//       <br />
//       <br />
//       <button>submit</button>
//     </div>
//   )
// }

// export default App

7
import React, { useEffect, useState } from 'react'

const App = () => {
  let [count,Setcount]=useState
  let [city,Setcity]=useState({
    city:'delhi'
  })

  useEffect(()=>{
    fetch('https://dummyjson.com/recipes').then((res)=>{
      return res.json()
    }).then((data)=>{
      console.log(data);
      
    })
  },[count])
  return (
    <div>
      <h2>{city}</h2>
      <button onClick={()=>Setcity('bhopal')}>city</button>
      <button onClick={()=>Setcount(count+1)}>click</button>

    </div>
  )
}

export default App
