let game = (function(){

//ISSUE: you want to update the game board before you alert the winner that way it looks like you actually won. 



    //"global" variables. 
    let gameBoard = {
        gameBoard:[0,0,0,0,0,0,0,0,0]};
    let playerGamePiece = 'X';// X goes first
    let cpuGamePiece = 'O'
    let turn = 0;// turn is used to track the number of turns passed to allow for the turn == 8 logic below. 

    //event listeners

    eventListenerSetup();
    const xButton = document.getElementById('X');
    const oButton = document.getElementById('O');
    //xButton.addEventListener('click', changeGamePiece) //initially you do not want a listener on the selected piece
    oButton.addEventListener('click', changeGamePiece)// listens for requests from the player to switch pieces

    cpuFirstMove()//this will check for the computers first move. 

    function cpuFirstMove(){//X goes first always so if cpu is X it will go first. 
        if(playerGamePiece == 'O'){//otherwise nothing will happen. 
        compTurn();
        turn++;
        }
    }//
    function eventListenerSetup(){
        const grids = document.querySelectorAll('.grid');
        grids.forEach((element) => {element.removeEventListener('click', runGame)});
        grids.forEach((element) => {element.addEventListener('click', runGame)});
    
    }
    //function that handles the players turn. 
    function runGame() {
        this.removeEventListener('click',runGame);
         if(turn == 8){// this prevents the compTurn function from preventing the player to place the last piece.
            updateDisplay.call(this, playerGamePiece);//updates the display
            updateGameBoard(this.id, playerGamePiece );//updates gameBoard array
            turn++;// increments turn
            if(checkBoardForWin(playerGamePiece)){//checks whether a winning combination exists on the board
                winner(playerGamePiece);
                return;
            } else {
                winner();
            };
        } else {
            updateDisplay.call(this, playerGamePiece);
            updateGameBoard(this.id, playerGamePiece );
            if(checkBoardForWin(playerGamePiece)){
                winner(playerGamePiece);
                return;
            };
            turn++;
            compTurn();// on all turns but the last the computer will play immediately(a transition would be more attractive) after the player
            turn++;
            if(turn == 9){
                winner()
            }else {
                if(checkBoardForWin(cpuGamePiece)){
                    winner(cpuGamePiece);
                    return;
                };
            }
        }
    };
    // function that updates the game board display
    function updateDisplay(gamePiece){
        this.innerHTML = gamePiece;
    };
    // function that updates the gameboard with an index and a gamepiece. 
    function updateGameBoard(index, gamePiece){
        gameBoard.gameBoard[index] = gamePiece
    };
    //function that will handle the computer's turn.
    function compTurn(){

        let index;
        while(true){
            index = Math.floor(Math.random()*9);
            if (gameBoard.gameBoard[index] == 0){
                break;
            }
            // ISSUE: you have to figure out how to deal with the 
            // last turn. WHen you make the final click in the last box
            // the function still wants to place a cpu turn and since it cant'
            // the whole thing doesn't work.
            // SOLVED
        }
        index = index.toString();
        element = document.getElementById(`${index.toString()}`);
        updateDisplay.call(element, cpuGamePiece);
        element.removeEventListener('click', runGame);
        updateGameBoard(index, cpuGamePiece )
    }
    function checkBoardForWin(x){
        //create a function that looks for three in a row. this is probably going to be 
        // a really ugly if statement with 1000 statements... lol
        if(gameBoard.gameBoard[0] == x && gameBoard.gameBoard[1] == x && gameBoard.gameBoard[2] == x){
            return true;
        } else if (gameBoard.gameBoard[3] == x && gameBoard.gameBoard[4] == x && gameBoard.gameBoard[5] == x){
            return true;
        } else if (gameBoard.gameBoard[6] == x && gameBoard.gameBoard[7] == x && gameBoard.gameBoard[8] == x){
            return true;
        } else if (gameBoard.gameBoard[0] == x && gameBoard.gameBoard[3] == x && gameBoard.gameBoard[6] == x){
            return true;
        } else if (gameBoard.gameBoard[1] == x && gameBoard.gameBoard[4] == x && gameBoard.gameBoard[7] == x){
            return true;
        } else if (gameBoard.gameBoard[2] == x && gameBoard.gameBoard[5] == x && gameBoard.gameBoard[8] == x){
            return true;
        } else if (gameBoard.gameBoard[0] == x && gameBoard.gameBoard[4] == x && gameBoard.gameBoard[8] == x){
            return true;
        }else if (gameBoard.gameBoard[2] == x && gameBoard.gameBoard[4] == x && gameBoard.gameBoard[6] == x){
            return true;
        }
    };
    function winner(gamePiece){
        let container = document.querySelector('.container');
        let winLine = document.createElement('div');
        container.appendChild(winLine);
        winLine.classList.add('winLine');

        if(gamePiece == playerGamePiece){
            winLine.innerHTML = 'You Win!';
        } else if(gamePiece == cpuGamePiece){
            winLine.innerHTML = 'You Lost!';
        } else{
            winLine.innerHTML = "It's a Draw!";
        }
        let resetButton = document.createElement('button');
        container.appendChild(resetButton);
        resetButton.addEventListener('click', resetBoard);
        resetButton.classList.add('reset');
        resetButton.innerHTML = 'Reset!'

    };
    function resetBoard(){
        let winLine = document.querySelector('.winLine');
        if (winLine != null){
            let resetButton = document.querySelector('.reset');
            winLine.remove();
            resetButton.removeEventListener('click', resetBoard);
            resetButton.remove();
        }
        gameBoard.gameBoard = [0,0,0,0,0,0,0,0,0];
        turn = 0;
        grids.forEach((element)=> element.innerHTML = '')
        eventListenerSetup();
        cpuFirstMove();
        
        
    };
    function changeGamePiece(){
        //any time you change the game piece you'll need to reset the game
        if(this.id == 'X'){
            cpuGamePiece = 'O';
            playerGamePiece = 'X';
            oButton.classList.remove('selected');
            xButton.classList.add('selected');
            oButton.addEventListener('click', changeGamePiece);
            xButton.removeEventListener('click', changeGamePiece);
            resetBoard();
        } else{//first click this.id will equal O
            cpuGamePiece = "X";
            playerGamePiece = "O";
            xButton.classList.remove('selected');
            oButton.classList.add('selected');
            xButton.addEventListener('click', changeGamePiece);
            oButton.removeEventListener('click', changeGamePiece);
            resetBoard();
        };
        
    };
})();
