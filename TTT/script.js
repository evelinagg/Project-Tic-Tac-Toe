const statusDisplay = document.querySelector('.game--status');

let gameActive = true; //to pause the game in case of an end
let currentPlayer = "X"; //store our current player
let gameState = ["", "", "", "", "", "", "", "", ""]; //empty strings in an array,easily track played cells

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Its a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn(); //let the player whose turn is

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) { //if the clicked cell has already been clicked 
    gameState[clickedCellIndex] = currentPlayer;           //if it hasn’t,continue our game
    clickedCell.innerHTML = currentPlayer;  // приемаме, че е кликната текущата клетка и индекса й 
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    let roundDraw = false;
    for (let i = 0; i <= 7; i++) {                  //check who won,lost, or its a draw or there are still moves to make
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) { // победа ще е, само ако всички клетки бъдат попълнени
            roundWon = true;
            break;
        }
    }

    if (roundWon == true) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    /*let roundDraw = !gameState.includes("");  //проверяваме дали има някакви стойности
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;  }*/
        if (roundDraw = !gameState.includes('')) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

    

    handlePlayerChange(); // ако сме до тук, никой не е печелил и има все още ходове които трябва да се направят
}

function handleCellClick(clickedCellEvent) { // to save the clicked html element
    const clickedCell = clickedCellEvent.target; // така взимаме data-cell-index за да идентифицираме къде е
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) { //проверяваме дали реда на Х или О е изигран,
        return;                                               
    } 

    handleCellPlayed(clickedCell, clickedCellIndex); // ако всичко е ок, продължаваме с играта
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ""); //връщаме играта в началото, с бутона restart долу
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
//event listener to the game cells and restart button