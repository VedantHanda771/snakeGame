const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
//increase snake size 
class snakePart{
constructor(x, y){
    this.x=x;
    this.y=y;
}

}

let speed=7;
let tileCount=20; 

let tileSize=canvas.clientWidth/tileCount-2;
let headX=10;
let headY=10;

// array for snake parts
const snakeParts=[];
let tailLength=2;

//initialize the speed of snake
let xvelocity=0;
let yvelocity=0;

//draw apple
let appleX=5;
let appleY=5;

//scores
let score=0;


function startGame(){
    // var snd = new Audio("start.wav"); // buffers automatically when created
    // snd.play();

    clearScreen();
    drawStarting();
    document.body.addEventListener('keypress', loading);
    function loading(){
        drawGame();
   }
}
//reatart button
document.getElementById('restartButton').addEventListener('click', function() {
    location.reload();
  });
// create game loop-to continously update screen
function drawGame(){
    changeSnakePosition();
    // game over logic
    let result=isGameOver();
    if(result){// if result is true
        return;
    }
    clearScreen();
    drawSnake();
    drawApple();
  
    checkCollision()
    drawScore();
    setTimeout(drawGame, 1000/speed);//update screen 7 times a second
}
//Game Over function
function isGameOver(){
    let gameOver=false; 
    //check whether game has started
    if(yvelocity===0 && xvelocity===0){
        return false;
    }
    if(headX<0){//if snake hits left wall
        gameOver=true;
    }
    else if(headX===tileCount){//if snake hits right wall
        gameOver=true;
    }
    else if(headY<0){//if snake hits wall at the top
        gameOver=true;
    }
    else if(headY===tileCount){//if snake hits wall at the bottom
        gameOver=true;
    }

    //stop game when snake crush to its own body

     for(let i=0; i<snakeParts.length;i++){
         let part=snakeParts[i];
         if(part.x===headX && part.y===headY){//check whether any part of snake is occupying the same space
             gameOver=true;
             break; // to break out of for loop
         }
     }
    

    //display text Game Over
    if(gameOver){
     clearScreen();
     ctx.fillStyle="black";
     ctx.font="40px verdana";
     ctx.fillText("Game Over! ", canvas.clientWidth/5, canvas.clientHeight/2);//position our text in center
     ctx.font="30px verdana";
     ctx.fillText("Score: " +score, canvas.clientWidth/3.3, canvas.clientHeight/1.6);//position our text in center

     var snd = new Audio("audio/dead.wav"); // buffers automatically when created
     snd.play();

     document.body.addEventListener('keypress', restart);
     function restart(){
        
        
     
        let result=isGameOver();
        if(result){
            drawGame();
        }} 

    }

    return gameOver;// this will stop execution of drawgame method
}

// score function
function drawScore(){
ctx.fillStyle="black"// set our text color to white
ctx.font="18px verdena"//set font size to 10px of font family verdena
ctx.fillText("Score: " +score, canvas.clientWidth-90,30);// position our score at right hand corner 


}

function drawStarting(){
ctx.fillStyle="black";
ctx.font="40px verdana";
ctx.fillText("Snake🐍 ", canvas.clientWidth/9.3, canvas.clientHeight/2);//position our text in center

ctx.fillStyle="black";
ctx.font="18px verdana";
ctx.fillText("Press Any Key To Start The Game", canvas.clientWidth/7.3, canvas.clientHeight/1.6);//position our text in center

}


// clear our screen
 function clearScreen(){

ctx.fillStyle= 'white'// make screen black
ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)// black color start from 0px left, right to canvas width and canvas height

 }
 function drawSnake(){
    ctx.fillStyle="black";
    //loop through our snakeparts array
    for(let i=0;i<snakeParts.length;i++){
        //draw snake parts
        let part=snakeParts[i]
         ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize,tileSize)
    }
    //add parts to snake --through push
    snakeParts.push(new snakePart(headX,headY));//put item at the end of list next to the head
    if(snakeParts.length>tailLength){
        snakeParts.shift();//remove furthest item from  snake part if we have more than our tail size

    }


 }
 function changeSnakePosition(){
     headX=headX + xvelocity;
     headY=headY+ yvelocity;
     
 }
 function drawApple(){
     ctx.fillStyle="red";
     ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
 }
 // check for collision and change apple position
 function checkCollision(){
     if(appleX==headX && appleY==headY){
         appleX=Math.floor(Math.random()*tileCount);
         appleY=Math.floor(Math.random()*tileCount);
         tailLength++;
         score++; //increase our score value
         var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
         snd.play();

     }
 }
 //add event listener to our body
 document.body.addEventListener('keydown', keyDown);

function keyDown()


//up
{
    if(event.keyCode==38){
        //prevent snake from moving in opposite direcction
        if(yvelocity==1)
        return;
        yvelocity=-1;
        xvelocity=0;
        
    }
    //down
    if(event.keyCode==40){
        if(yvelocity==-1)
        return;
        yvelocity=1;
        xvelocity=0;
    }

//left
    if(event.keyCode==37){
        if(xvelocity==1)
        return;
        yvelocity=0;
        xvelocity=-1;
    }
    //right
    if(event.keyCode==39){
        if(xvelocity==-1)
        return;
        yvelocity=0;
        xvelocity=1;
    }
}

//  drawGame(); 

startGame();