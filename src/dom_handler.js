import { playerA, computer } from "."
let playerBoard = document.querySelector(".player")
let computerBoard = document.querySelector(".computer")
let messageHeading = document.querySelector(".message")
let positionTogglerButton = document.querySelector(".toggler")

const boardRenderer = function (player) {
    boardRefresher(player)
    //rendering player board
    for (let i=0; i<10; i++) {
        
        for (let j=0; j<10; j++) {
            let cell = document.createElement('p')
            cell.classList.add('cell')
            cell.id = `${i}${j}`
            //taking data from gamebaord
            let cellValue = player.gameboard.board[i][j]
            
            if (player.isComputer===false) {
                playerBoard.appendChild(cell);
            } else {
                computerBoard.appendChild(cell)
            }
            switch(cellValue) {
                //0 is normal cell
                case 0:
                    cell.classList.add('normal');
                    break;
                //1 is discovered empty cell
                case 1:
                    cell.classList.add('discovered');
                    break;
                //x is damaged ship cell
                case 'x':
                    cell.classList.add('damaged');
                    break;
                default:
                    //ship is only visible if it is not a computer player
                    if (player.isComputer===false) {
                        cell.classList.add('ship');
                    }
            }
        }
    }
    //as the loading loop ends, add event listeners to each cell
    //conditional for stopping eventlistener addition once all ships are placed
    if (player.gameboard.currentShipIndex<5) {
        eventListenerAdder(player)
    }
}

const boardRefresher = function (player) {
        //cleaning old data on html
    if (player.isComputer===false) {
        playerBoard.innerText = ''
    } else {
        computerBoard.innerText = ''
    }
}

const eventListenerAdder = function (player) {
    for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
            let cell = document.getElementById(`${i}${j}`)

            cell.addEventListener("click", ()=> { 
                player.gameboard.placeShip(i,j)
                boardRenderer(player)
                //when 5 ships are placed reveal computer board
                if (player.gameboard.currentShipIndex===5) {
                    computerBoard.classList.add("board")
                    boardRenderer(computer)
                    messageHeading.innerText ="Begin attacking opponent's ship !"
                }
            })
        }
    }

}

positionTogglerButton.addEventListener("click", () => {
    playerA.gameboard.shipPositionToggler()
    positionTogglerButton.innerText = playerA.gameboard.shipPosition
})

export {boardRenderer, eventListenerAdder}