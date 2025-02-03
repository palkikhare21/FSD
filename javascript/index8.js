let canvas = document.querySelector('canvas');
let pen = canvas.getContext('2d')

let cell=50
let snakeCells=[[0,0]]
let direction='right'
let gameOver=false 

document.addEventListener('keydown',(e)=>{
    if(e.key==='Arrowup'){
        direction='up'
    }
    else if(e.key==='ArrowDown'){
        direction='down'
    }
    else if(e.key==='Arrowleft'){
        direction='left'
    }
    else{
        direction='right'
    }
})
setInterval(()=>{
    shapeCreate()
    update()
},200)

function shapeCreate(){
    if(gameOver){
        clearInterval(id)
        pen.fillStyle='red';
        pen.font='40px sans-serif';
        pen.fillText('Game Overi',50,150);
        return
    }
    
        pen.clearRect(0,0,1000,600)
        for(let i of snakeCells){
            pen.fillStyle='#FC819E'
            pen.fillRect(i[0],i[1],cell,cell)
        }
       
    
}

// shapeCreate()
function update(){
let headX= snakeCells[snakeCells.length-1][0]
let headY= snakeCells[snakeCells.length-1][1]

// let newX=headX+cell
// let newY=headY
// snakeCells.push([newX,newY])
// snakeCells.shift()
let newX
let newY
if(direction==='right'){ 
    newX=headX+cell,
    newY=headY

    if(newX===1000){
        gameOver=true
    }
   }
   else if(direction=='left'){
    newX=headX-cell
    newY=headY
    if(newX<0){
        gameOver=true
    }

   }
   else if(direction=='up'){
    newX=headX
    newY=headY-cell
    if(newY<0){
        gameOver=true
    }
   
   }
   else{
    newX=headX
    newY=headY+cell
    if(newY<0){
        gameOver=true
    }
 
   }
   snakeCells.push([newX,newY])
   snakeCells.shift()
   
}


