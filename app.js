const boxes =  Array.from(document.getElementsByClassName('box'));
const playText  = document.getElementById('playText');
const restart = document.getElementById('restartBtn');
const O_player = "O";
const X_player = "X";
let currentPlayer = O_player;
const usedCases = [null,null,null,null,null,null,null,null,null];

const drawBoard = () => {
    //drawing the appropriate borders for each cells
    boxes.forEach((box, index) => {
        let styleString = '';
        //For the top cells
        if (index < 3){
            styleString += 'border-bottom: 3px solid var(--purple);';
        }

        //for the left cells
        if(index % 3 === 0){
            styleString += 'border-right: 3px solid var(--purple);';
        }

        // for the right cells
        if (index % 3 === 2){
            styleString += 'border-left: 3px solid var(--purple);';
        }

        // for the bottom cells
        if(index > 5){
            styleString += 'border-top: 3px solid var(--purple);';
        }

        box.style = styleString;
        box.addEventListener('click',boxClicked)
    })
}


// Action when a box is cliqued.
const boxClicked = (box) =>{
    const id = box.target.id;
    if(!usedCases[id]){
        usedCases[id] = currentPlayer;
        box.target.innerText = currentPlayer;

        // Check if the player has won.

        if(hasWon(currentPlayer)){
            playText.innerText = `${currentPlayer} has won the game`;
            return;
        }

        // Switch players.
        currentPlayer = currentPlayer === O_player ? X_player : O_player;
    }
}

// check if the player has won

const hasWon = (player) =>{
    // check the lines
    for(let i = 0; i < 3 ; i++){
        if(checkTriplet(player, getLine(i))){
            return true;
        }
    }

    // check the columns
    for(let i = 0; i < 3 ; i++){
        if(checkTriplet(player, getColumn(i))){
            return true;
        }
    }

    // check the diagonal
    if(checkTriplet(player,getDiag())){
        return true;
    }

    //check the adjacent diagonal
    if(checkTriplet(player,getAdjacentDiag())){
        return true;
    }

    return false;
}

// Check if a triplet is a winning one
const checkTriplet = (player, triplet) => {
    if(triplet[0] === player && triplet[0] === triplet[1] && triplet[1] === triplet[2]){
        return true;
    }

    return false;
}

// get a line by giving the index
const getLine = (id) => {
    const startId = id*3;
    const line  = [null,null,null];
    let j = 0;
    for(let i = startId; i < startId + 3; i++){
        line[j] = usedCases[i];
        j++;
    }
    return line;
}

// get a column by giving an index
const getColumn = (id) => {
    const column = [null,null,null];
    let j = 0;
    usedCases.forEach((box,ind) => {
        if(ind % 3 === id){
            column[j] = box;
        }
        j++;
    });

    return column;
}

//get the diagonal
const getDiag = () => {
    const diag = [null,null,null];
    diag[0] = usedCases[0];
    diag[1] = usedCases[4];
    diag[2] = usedCases[8];
    return diag;
}

//Get the adjacent diagonal
const getAdjacentDiag = () => {
    const diag = [null,null,null];
    diag[0] = usedCases[2];
    diag[1] = usedCases[4];
    diag[2] = usedCases[6];

    return diag;

}
// draw the board

drawBoard();

// empower the restart button
const startAgain = () => {
    usedCases.forEach((box, ind) => {
        box = null;
        boxes[ind].innerText = '';
    })

    playText.innerText = "Let's play";
}

restart.addEventListener('click', startAgain)



