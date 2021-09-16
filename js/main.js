// get elements
// control buttons
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const randomize = document.querySelector('.randomize');
// canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
// global stopper 
let stopper = 0;
// canvas details
const resolution = 20;
canvas.width = 500;
canvas.height = 500;
// row and column 
const COLUMNS = canvas.width/resolution;
const ROWS = canvas.height/resolution;
// function to build grid
function buildCanvas() {
    return new Array(COLUMNS).fill(null)
    .map(()=> new Array(ROWS).fill(null)
    .map(()=> Math.floor(Math.random()*2)));
}
// render grid to window
let grid = buildCanvas();
function update(){
  if(stopper === 0){
    grid= nextGen(grid);
    render(grid);
    requestAnimationFrame(update);
  }
} 
// find next generation of cells
function nextGen(grid){
   const nextGen = grid.map( arr => [...arr]);
   for(let columns = 0; columns < grid.length; columns++){
    for(let row = 0; row < grid[columns].length; row++){
        const cell= grid[columns][row];
        let numberOfNeighbour = 0;
        for(let i= -1; i < 2 ; i++){
            for(let j= -1 ; j < 2 ; j++){
               if(i === 0 && j===0){
                   continue; 
               }
               const Xcell = columns+i;
               const Ycell = row+j;
               if(Xcell >=0 && Ycell >0 &&  Xcell<COLUMNS && Ycell < ROWS){
                  let currentNeighbour = grid[columns+i][row+j];
                  numberOfNeighbour += currentNeighbour;
               }
            }     
        }
        // rules of life
        if(cell === 1 && numberOfNeighbour < 2){
          nextGen[columns][row] = 0;  
        }else if(cell === 1 && numberOfNeighbour > 3){
          nextGen[columns][row] = 0;
        }else if(cell === 0 && numberOfNeighbour === 3){
          nextGen[columns][row] = 1;
        }


    }
  }
  return nextGen;
}
function render(grid) {
    for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid[col].length; row++){
            const cell= grid[col][row];
            context.beginPath();
            context.rect(col * resolution , row * resolution, resolution , resolution );
            context.fillStyle = cell ? 'black' :'aqua';
            context.fill();
            context.stroke();
        }
    }
}
// event listeners
// start 
start.addEventListener('click'  , () => {
  stopper =0;
  requestAnimationFrame(update);
})
// randomize
randomize.addEventListener('click' , () => {
   stopper = 1;
   grid = buildCanvas();
   render(grid);
})
// stop 
stop.addEventListener( 'click' , () => {
  stopper = 1;
})

