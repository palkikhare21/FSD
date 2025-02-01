

// let inp= document.querySelector('input')
// let btn= document.querySelector('button')
// let list= document.querySelector('list')

// btn.addEventListener('click',function(){
   
//         let searchText=input.value;
//        fetchData(searchText);
//        input.value=''; 
// })
// function fetchData(searchText){


// fetch('https://api.tvmaze.com/search/shows?q=${searchText}').then((res)=>
// {
//     return res.json()
// }).then((response)=>{

//     console.log(response,"helloo");
    

//     manipulateDom(response)
// })
// }

// function manipulateDom(datas){

// }

// for(let data of datas){
//     let figure= document.createElement('figure');

//     if(data.show.image){
//         figure.innerHTML=
        
//      <><img src $ {...data.show.image.original} alt='photo' /><br /><h1> Genre: ${data.show.genres[0]} </h1></> 
//      list.appendChild(figure)
//          }

// }

let input = document.querySelector('input');
let btn = document.querySelector('button');
let list = document.getElementById('list');


btn.addEventListener('click' , function(){
    let searchText = input.value;
     fetchData(searchText);
    input.value = '';
})

function fetchData(searchText){
    // axios.get(`https://api.tvmaze.com/search/shows?q=${searchText}`)
    // .then(function(response){
    //     console.log(response.data);
    //     manipulateDom(response.data);
    // })
    fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`).
    then((res)=>{
        return res.json()

    }).then((response)=>{
        console.log(response,"kyayayay");
        
        manipulateDom(response)

    })
}


function manipulateDom(datas){
    // while(list.firstChild){
    //     list.firstChild.remove();
    // }

    for(let data of datas){
        let figure = document.createElement('figure');

        if(data.show.image){
            figure.innerHTML = `
            <img src=${data.show.image.original} alt='photo' height=200px/>
            <br/>
            <h2> Genre: ${data.show.genres[0]} </h2>
            `
            list.appendChild(figure)
        }
    }
}
