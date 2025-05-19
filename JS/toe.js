 let boxes=document.querySelectorAll(".box");
 let resetBtn = document.querySelectorAll("#reset");
 let newGameBtn = document.querySelector("#new-btn");
 let msgContainer =document.querySelector(".msg-container");
 let msg =document.querySelector("#msg";)

 let turn0=true;
 let count =0;
 const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8 ],
 ];
 const resetGame+()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
 };
 boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        // console.log("box was clicked");
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        
    box.dsabled=true;
    count++;

    let isWinner=checkWinner();
    if (count ===9 && !isWinner){
        gameDraw();
    }
    
 });
 const checkWinner=()=>{
    for(let pattern of winPatterns){
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        let position0=boxes[pattern[0]].innerText;
         let position1= boxes[pattern[1]].innerText;
           let position2=boxes[pattern[2]].innerText;
        if(position0 !="" && position1 !="" && position2 !=""){
            if(position0=== position1 && position1===position2){
                    console.log("winner");
            }
                
                
        }
        
        
    }
 };