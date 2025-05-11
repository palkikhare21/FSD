 let boxes=document.querySelectorAll(".box");
 let resetBtn = document.querySelectorAll("#reset");

 ;let turn0=true;
 const winPatterns=[
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,5],
    [2,5,8],
    [0,4,8],
    [2,4,6],
 ];
 boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turn0){
            box.innerText="0";
            turn0=false;
        }else{
            box.innerText="X";
            turn1=true;
        }
        
    box.dsabled=true;

    checkWinner();
    });
    
 });
 const checkWinner=()=>{
    for(let pattern of winPatterns){
        console.log(pattern);
        
    }
 };