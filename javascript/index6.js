// let form = document.querySelector('form')

// form.addEventListener('submit',(e)=>{
//     e.preventDefault()
//     console.log(form[0].value,"hehehe");
//     console.log(form[1].value,"hehehe");
//     console.log(form[2].value,"hehehe");
//     console.log(form[3].value,"hehehe");
//     let data={
//         firstname:form[0].value,
//         lastname:form[1].value,
//         email:form[2].value,
//         password:form[3].value

//     }
//     localStorage.setItem('user',JSON.stringify(data))
//     let userData = localStorage.getItem('user')

//     console.log(userData,"useresss");
    
//     console.log(JSON.parse(userData),"useresss");
    
// })
//  let logInForm= document.querySelector('#one')

//  logInForm.addEventListener('sunmit',(e)=>{
//     e.preventDefault()
//     let userData= localStorage.getItem('user')
//     let parseData=JSON.parse(userData)
//     console.log(logInForm[0].value,);
    
//     if(logInForm[0].value==parseData.email && logInForm[1].password==parseData.password){
//         alert('sab theek hai')
//     }
//     else{
//         alert('galat hai')
//     }
//  })


// localStorage.setItem('user','gm')

// let form2=   document.querySelector('form')
//    form.addEventListener('submit',(e)=>{
//     e.preventDefault()
//     console.log(form[0].value,"heheh");
//     console.log(form[1].value,"heheh");
//     let data={
//         name:form[0].value,
//         email:form[1].value,
//         passWord:form[2].value
//     }

//     localStorage.setItem('user',JSON.stringify(data))
//    let userData=  localStorage.getItem('user')

//    console.log(userData,"usese");
//    console.log(JSON.parse(userData),"usese");

    
//    })



//   let LoginForm=    document.querySelector('#one')

//   LoginForm.addEventListener('submit',(e)=>{
//     e.preventDefault()
//       let userData=  localStorage.getItem('user')
//       let parsData=JSON.parse(userData)
//       console.log(LoginForm[0].value,);
      
//        if(LoginForm[0].value==parsData.email && LoginForm[1].value==parsData.passWord){
//         alert('sab kuch theek hai ')
//        }
//        else{
//         alert('kuch bhi????')
//        }

//   })

let inp= document.querySelector('input')
let btn= document.querySelector('button')
let ul=document.querySelector('ul')


btn.addEventListener('click',()=>{
   
        let text=inp.value
        let li= document.createElement('li')
        li.innerText=text
        ul.appendChild(li)
        inp.value=''
        li.addEventListener('click',()=>{
            li.remove()
        })  
})

