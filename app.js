let gameInfo = document.querySelector('.game-info');
let boxes = document.querySelectorAll('.box')
let newGameBnt = document.querySelector('.btn')


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// create a function to initialize the game 
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pr bhi update krna hoga 
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // initialize box with css properties again to remove green color 
        box.classList = `box box${index+1}`;
    })
    newGameBnt.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function turnSwap(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer= "X";
    }
    // UI Update 
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position)=>{
        // all 3 boxes should be non empty and exacty same in  value 
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )
        && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]] ) )
        {
            // check is winner X 
            if(gameGrid[position[0]]==="X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            // disable pointer event 
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            // now we know the winner so add green color
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
    
        }
    })
    //  we have a winner 
    if(answer != ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBnt.classList.add("active");
        return;
    }

    // when there is no winner
    // check whether there is tie 
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box != ""){
            fillCount++;
        }
    })

    // when board is fillled
    if(fillCount == 9){
        gameInfo.innerText = "Game Tied !";
        newGameBnt.classList.add("active")
    }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none"

        // swap the turn 
        turnSwap();

        // check is gameOver ?
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

newGameBnt.addEventListener('click', initGame)