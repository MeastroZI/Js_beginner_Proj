console.log("js is running")
let snakeArr = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    
]
let StartMoving = false
let gameStart = new Audio('source/theme.mp3')
let score = new Audio('source/score.wav')
let SnakeCollide = new Audio('source/colide.wav')
let foodDir = { x: 15, y: 15 }
let direction = { x: 0, y: 0 }
let lastPaintTime = 0;
let speed = 3;
let board = document.getElementById("gameBoard")
let ScoreBoard=document.getElementById("scoreBoard")
let point=1   
//functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log("ctime is " ,ctime)
    if ((ctime - lastPaintTime)/1000  < 1/speed ) {
        return
    }
    // console.log(" is " ,ctime - lastPaintTime)
    lastPaintTime = ctime
    gameEngine();
}

function gameEngine() {
   
    
    // moving the snake
    if (StartMoving==true) {
        SnakeMove();
    }

    // Increment of the snake height after eating food
    if (snakeArr[0].x==foodDir.x && snakeArr[0].y==foodDir.y) {
        let b=50 // gride boxes number end
        
        foodDir.x=Math.round(50*Math.random())
        foodDir.y=Math.round(50*Math.random())
        let lastSegment = snakeArr[snakeArr.length-1]
        score.play()
        ScoreBoard.innerHTML=`Score : ${point}`
        point++
        snakeArr.push({x:lastSegment.x-direction.x,y:lastSegment.y-direction.y}) 
    }

    // if snake is collide to the boundery then game over
    if (collide() == true) {
        ScoreBoard.innerHTML="You Lose🤭🤭 "
        gameStart.pause()
        SnakeCollide.play()
        StartMoving=false
        point=0;

        
        
       
            
        snakeArr= [  //reseting the snake position after collision of the snake with wall
            { x: 10, y: 10 },
            { x: 10, y: 11 }
            
        ]
        
    }

    










    //displaying the snake and food

    let foodElement = document.createElement("div")
    board.innerHTML = ""
    foodElement.classList.add("food")
    foodElement.style.gridColumnStart = foodDir.x
    foodElement.style.gridRowStart = foodDir.y
    board.appendChild(foodElement)
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div')
        snakeElement.style.gridColumnStart = e.x
        snakeElement.style.gridRowStart = e.y

        if (index == 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)

    })
}

window.requestAnimationFrame(main);

//changing the direction of the snake

window.addEventListener("keydown", (e) => {
    direction = { x: 0, y: 0 }
    // gameStart.play()
    
    StartMoving=true;
    SnakeCollide.pause()
    ContinuePlay(gameStart)
    
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0
            direction.y = -1
            // console.log(direction.x,"  ",direction.y)
            break;
        case "ArrowDown":
            direction.x = 0
            direction.y = 1
            // console.log(direction.x,"  ",direction.y)
            break;
        case "ArrowLeft":
            direction.x = -1
            direction.y = 0
            // console.log(direction.x,"  ",direction.y)
            break;
        case "ArrowRight":

            direction.x = 1
            direction.y = 0
            // console.log(direction.x,"  ",direction.y)
            break;
    }
})
// function to play track continusly
function ContinuePlay(audio){
    
    if (typeof audio.loop == 'boolean')
    {
        audio.loop = true;
    }
    else
    {
        audio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    audio.play();
}

//Snake move function
function SnakeMove(){
    for (let i = snakeArr.length-2; i >=0 ; i--) {
        // const element = snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]} 
        
    }
    // console.log(snakeArr[0].x+direction.x)
    snakeArr[0].x=snakeArr[0].x+direction.x;
    snakeArr[0].y=snakeArr[0].y+direction.y;
}

// function for collision of the snake with wall
function collide(){
    if ((snakeArr[0].x==51)||(snakeArr[0].y==51)||(snakeArr[0].x==0)||(snakeArr[0].y==0)) {
        return true
    }
    else{
        false
    }
}


//main logic