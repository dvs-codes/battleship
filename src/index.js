import './style.css'
import Player from "./player";
import { boardRenderer } from './dom_handler';


let playerA = new Player()
let computer = new Player()
computer.isComputer = true

//placing computer ships
computer.gameboard.placeShip(0, 3)
computer.gameboard.shipPositionToggler()
computer.gameboard.placeShip(4,5)
computer.gameboard.placeShip(2,1)
computer.gameboard.shipPositionToggler()
computer.gameboard.placeShip(8,1)
computer.gameboard.placeShip(9,8)
// console.log(computer.gameboard)

//placing player ships



boardRenderer(playerA)
// shipPlacer()
// boardRenderer(computer)

export {playerA, computer}



