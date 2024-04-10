// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
var score = 0 ;
var speed = 8;
var lastPaintTime = 0;
let hiscoreval;

// in js box from top left point right is +x axis and below +y axis
let snakeArr = [
    { x: 13, y: 15 }
]

let food = { x: 10, y: 15 };



// Game Functions

function main(currentTime) {
    window.requestAnimationFrame(main);
    // console.log(currentTime);
    // we want to render the frame ever 0.5 sec it is rendering very fast
    // currentTime-lastPaintTime)/1000  to convert into mili sec
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function gameEngine() {

    //part 1 updating snake array and food 

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Gamer over. Press any key to play again");
    
        snakeArr = [{ x: 13, y: 15 } ];
        // musicSound.play();
        score = 0;
        

    }
    function isCollide(snake){
        // if u bump into yourself
        for (let i = 1; i < snakeArr.length; i++) {
            if(snake[i].x === snakeArr[0].x && snake[i].y === snakeArr[0].y){
                return true;
            }
        }
         // if u bump into wall
        if(snakeArr[0].x >= 18 || snakeArr[0].x < 0 || snakeArr[0].y >= 18 || snakeArr[0].y < 0 ){
            return true;
        }
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x  ){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore:" + hiscoreval; 
        }
// use ScoreBox as id name cuz if u put score html id's are asssigned as a variable in js so it gets confuse as we have two score values then.
        scoreBox.innerHTML = "Score: " +  score;
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y: snakeArr[0].y +inputDir.y  })
        var a = 2;
        var b= 16;
        //generate food at random places 
        food = {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())}
    }

// Moving the snake
for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
    
}
snakeArr[0].x += inputDir.x; 
snakeArr[0].y += inputDir.y; 

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }

        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}





// ***************// Main logic starts here *******************

// use this to render the screen without any flicker and is better way then setInterval 



// localStorage.clear();

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null || 0){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore:" + hiscoreval;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // start the game 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrow up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("arrow Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("arrow Right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("arrow Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})


// Key points of the project

// Using requestAnimationFrame() method to perform animations instead of setInterval as it runs the callback function before the next repaint. It's more efficient as it pauses when the user switches tabs, saving CPU usage and battery life. 

// It render the screen without any flicker and is better way then setInterval 

// While setTimeout and setInterval run the callback function after a specified time delay,