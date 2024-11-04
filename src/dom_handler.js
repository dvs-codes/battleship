import { playerA } from "."
let playerBoard = document.querySelector(".player")
let computerBoard = document.querySelector(".computer")
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
    eventListenerAdder(player)

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
                    console.log(player.gameboard.board)
            })
        }
    }

}

positionTogglerButton.addEventListener("click", () => {
    playerA.gameboard.shipPositionToggler()
    positionTogglerButton.innerText = playerA.gameboard.shipPosition
})

export {boardRenderer, eventListenerAdder}