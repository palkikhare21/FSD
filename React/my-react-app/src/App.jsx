// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// import React from 'react'
// // import Form from './Form'


// const App = () => {
//   const [color, setColor] = React.useState('red')
//   function fun1() {
//     console.log('hehehe');
//     setColor('green')

//   }
//   return (
//     <div style={{ backgroundColor:color, height: "100vh" }}>
//       <h3>0</h3>
//       <button onClick={fun1}>Click</button>
//       {/* <Form /> */}
//     </div >

//   )
// }

// export default App

// import React from 'react'
// import Length from './Length'

 
// const App = () => {
//  const[count,setCount] = React.useState(0)
//   return (
//     <div>
//       <h3>{count}</h3>

//       <button onClick={()=>{
//         setCount(count+1)
//       }}>increse</button>
//       <button onClick={()=>{
//         setCount(count-1)
//       }}>descrese</button>
//     </div>
//   )
// }

// export default App


// import React from 'react'
// import Length from './Length'

// const App = () => {
//   return (
//     <div>
//       <Length />
//     </div>
//   )
// }

// export default App

// import React, { useState } from 'react'

// const App = () => {
//   const [time,setTime]= useState('');
//   let id;
//   function start(){
//     let id=setInterval(()=>{
//       const t= new Date().toLocaleTimeString();
//       setTime(t);
//     })
//     setid(id);
//   }
//   function setid(id){
//     id=id;
//   }
//   function stop(){
//       clearInterval(id);
//   } 
   
  
//   return (
//     <div > 
//       <h2>{time}</h2>
//       <button onClick={()=>{start()}}>start</button>
//       <button onClick={()=>{stop()}}>stop</button>
      
//     </div>
//   )
// }

// export default App

// import React from 'react'
// import UseEffect from './UseEffect'
// const App = () => {
//   return (
//     <div>
//       <UseEffect />
//     </div>
//   )
// }

// export default App

import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
const App = () => {
  return (
    <div>
      <Navbar />
      <Homeome />
      
    </div>
  )
}

export default App




