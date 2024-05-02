var Blocksize = 25;
var rows = 30;
var cols = 30;
var board;
var context;

var snakeX = Blocksize * 5;
var snakeY = Blocksize * 5;

var foodX = Blocksize * 10
var foodY = Blocksize * 10;

var DeltaX = 0;
var DeltaY = 0;

var snakeBody = [];
var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * Blocksize ;
    board.width = cols * Blocksize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirections)
    setInterval(update, 1000/10);
}
function update(){
    if(gameOver){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0 ,0 ,board.height ,board.width);

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,Blocksize,Blocksize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    for(let i = snakeBody.length-1;i > 0;i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
       snakeBody[0] =  [snakeX,snakeY]
    }

    context.fillStyle = "lime";
    snakeX += DeltaX * Blocksize;
    snakeY += DeltaY * Blocksize;
    context.fillRect(snakeX,snakeY,Blocksize,Blocksize);
    for(let i = 0;i < snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],Blocksize,Blocksize);
    }

    if(snakeX < 0 || snakeX > cols*Blocksize || snakeY < 0 || snakeY > rows*Blocksize)
    {
        gameOver = true;
        alert("Game Over!");
    }
    for(let i = 0;i < snakeBody.length;i++)
    {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over!");
        }
    }
} 
function placeFood(){
    foodX = Math.floor(Math.random() * cols) * Blocksize;
    foodY = Math.floor(Math.random() * rows) * Blocksize;
}
function changeDirections(e){
    if(e.code == "ArrowUp" && DeltaY != 1){
        DeltaX = 0;
        DeltaY = -1;
    }
    else if(e.code == "ArrowDown" && DeltaY != -1){
        DeltaX = 0;
        DeltaY = 1;
    }
    else if(e.code == "ArrowRight" && DeltaX != -1){
        DeltaX = 1;
        DeltaY = 0;
    }
    else if(e.code == "ArrowLeft" && DeltaX != 1){
        DeltaX = -1;
        DeltaY = 0;
    }
}