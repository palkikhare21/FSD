let canvas = document.querySelector('canvas');
let pen = canvas.getContext('2d')

let cell=50
let snakeCells=[[0,0]]
let direction='right'


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
   }
   else if(direction=='left'){
    newX=headX-cell
    newY=headY

   }
   else if(direction=='up'){
    newX=headX
    newY=headY-cell
   
   }
   else{
    newX=headX
    newY=headY+cell
 
   }
   snakeCells.push([newX,newY])
   snakeCells.shift()
   
}


