/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom_handler.js":
/*!****************************!*\
  !*** ./src/dom_handler.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   boardRenderer: () => (/* binding */ boardRenderer)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");

let playerBoard = document.querySelector(".player");
let computerBoard = document.querySelector(".computer");
let messageHeading = document.querySelector(".message");
let positionTogglerButton = document.querySelector(".toggler");
const boardRenderer = function (player) {
  boardRefresher(player);
  //rendering player board
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement('p');
      cell.classList.add('cell');
      cell.classList.add(`c${i}${j}`);
      // cell.id = `${i}${j}`
      //taking data from gamebaord
      let cellValue = player.gameboard.board[i][j];

      //condition for appropriate addition of data on proper board
      if (player.isComputer === false) {
        playerBoard.appendChild(cell);
      } else {
        computerBoard.appendChild(cell);
      }
      switch (cellValue) {
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
          if (player.isComputer === false) {
            cell.classList.add('ship');
          }
      }
    }
  }
  //as the loading loop ends, add event listeners to each cell
  //conditional for stopping eventlistener addition once all player ships are placed
  if (player.gameboard.currentShipIndex < 5 && player.isComputer === false) {
    eventListenerAdder(player, "placement");
  } else {
    eventListenerAdder(player, "attack");
  }
};
const boardRefresher = function (player) {
  //cleaning old data on html, condition for selecting boards
  if (player.isComputer === false) {
    playerBoard.innerText = '';
  } else {
    computerBoard.innerText = '';
  }
};
const eventListenerAdder = function (player, type) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell;
      // //conditional to select appropriate cell, computer or player
      if (player.isComputer === true) {
        cell = document.querySelector(`.computer .c${i}${j}`);
      } else {
        cell = document.querySelector(`.player .c${i}${j}`);
      }

      //two types of eventListeners, if placement than it 
      //detects click and places ship, otherwise it trigger attack
      if (type === 'placement') {
        cell.addEventListener("click", () => {
          player.gameboard.placeShip(i, j);
          boardRenderer(player);
          //when 5 ships are placed reveal computer board
          if (player.gameboard.currentShipIndex === 5) {
            computerBoard.classList.add("board");
            boardRenderer(___WEBPACK_IMPORTED_MODULE_0__.computer);
            eventListenerAdder(___WEBPACK_IMPORTED_MODULE_0__.computer, "attack");
            messageHeading.innerText = "Begin attacking opponent's ship !";
          }
        });
      } else if (type === 'attack') {
        cell.addEventListener("click", () => {
          player.gameboard.receiveAttack(i, j);
          boardRenderer(player);
          console.log(player.gameboard.board);
        });
      }
    }
  }
};
positionTogglerButton.addEventListener("click", () => {
  ___WEBPACK_IMPORTED_MODULE_0__.playerA.gameboard.shipPositionToggler();
  positionTogglerButton.innerText = ___WEBPACK_IMPORTED_MODULE_0__.playerA.gameboard.shipPosition;
});


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");

class Gameboard {
  constructor() {
    // here null is undiscoverd cell
    // a 5,5,5,5,5 series of cell indicates a horizontally placed ship with 5 length
    this.board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.ships = [this.shipMaker(5), this.shipMaker(4), this.shipMaker(3), this.shipMaker(3), this.shipMaker(2)];
    this.currentShipIndex = 0;
    this.shipPosition = 'horizontal';
  }
  shipPositionToggler() {
    if (this.shipPosition === 'horizontal') {
      this.shipPosition = 'vertical';
    } else {
      this.shipPosition = 'horizontal';
    }
  }
  placeShip(verticalIndex, horizontalIndex) {
    //conditional for placing only 5 ships
    if (this.currentShipIndex < 5) {
      let currentShipLength = this.ships[this.currentShipIndex].length;

      //variable must be true for entering the placement loop
      let isCellValid = false;
      for (let i = 0; i < currentShipLength; i++) {
        //conditional for horizontal
        if (this.shipPosition === 'horizontal') {
          if (horizontalIndex + i < 10 && this.board[verticalIndex][horizontalIndex + i] === 0) {
            isCellValid = true;
          } else {
            isCellValid = false;
            break;
          }
        } else {
          //conditional for vertical
          if (verticalIndex + i < 10 && this.board[verticalIndex + i][horizontalIndex] === 0) {
            isCellValid = true;
          } else {
            isCellValid = false;
            break;
          }
        }
      }
      if (isCellValid) {
        for (let i = 0; i < currentShipLength; i++) {
          //for horizontal
          if (this.shipPosition === 'horizontal') {
            this.board[verticalIndex].splice(horizontalIndex + i, 1, currentShipLength);
          } else {
            this.board[verticalIndex + i].splice(horizontalIndex, 1, currentShipLength);
          }
        }
        this.currentShipIndex++;
      }
    }
  }
  shipMaker(length) {
    let ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](length);
    return ship;
  }
  receiveAttack(verticalIndex, horizontalIndex) {
    //if the target cordinate is empty, mark it as '1' so that it is recognised as discovered cell
    if (this.board[verticalIndex][horizontalIndex] === 0) {
      this.board[verticalIndex].splice(horizontalIndex, 1, 1);
    } else if (this.board[verticalIndex][horizontalIndex] !== 'x' && this.board[verticalIndex][horizontalIndex] !== 1) {
      //before changing the cell take the info and store the hit on that specific ship

      let indexOfShip = 5 - this.board[verticalIndex][horizontalIndex];
      this.ships[indexOfShip].hit();
      //change the target cordinate to 'x' so that it is marked as a damaged ship, 
      this.board[verticalIndex].splice(horizontalIndex, 1, 'x');
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computer: () => (/* binding */ computer),
/* harmony export */   playerA: () => (/* binding */ playerA)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom_handler */ "./src/dom_handler.js");



let playerA = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
let computer = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
computer.isComputer = true;

//placing computer ships
computer.gameboard.placeShip(0, 3);
computer.gameboard.shipPositionToggler();
computer.gameboard.placeShip(4, 5);
computer.gameboard.placeShip(2, 1);
computer.gameboard.shipPositionToggler();
computer.gameboard.placeShip(8, 1);
computer.gameboard.placeShip(9, 8);
(0,_dom_handler__WEBPACK_IMPORTED_MODULE_2__.boardRenderer)(playerA);

//starting a round



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");

class Player {
  constructor() {
    this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.winStatus = false;
    this.isComputer = false;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Ship {
  // a ship shall have lenght and a sink status
  constructor(length) {
    let sinkStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    this.length = length;
    this.sinkStatus = sinkStatus;
  }

  // if length becomes zero it shall return true
  isSunk() {
    return this.length === 0;
  }

  // every hit reduces the length by 1
  hit() {
    this.length -= 1;
    if (this.isSunk()) {
      this.sinkStatus = true;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
}

.heading {
    margin-top: 10px;
    font-size: 80px;
    text-align: center;
}

.message {
    font-size: 40px;
    text-align: center;
}

.toggler {
    width: 100px;
    justify-self: center;
    align-self: center;
    background-color: black;
    color: white;
    height: 50px;
    transition: background-color 0.5s ease;
    transition: color 0.5s ease;
}

.toggler:hover {

    background-color: white;
    color: black;
}

.gameboards {
    display: flex;
    border: 1px solid black;
    min-width: 1300px;
    justify-content: space-around;
    padding-top: 50px;
    padding-left: 200px;
    padding-right: 200px;
}

.board {
    border: 2px solid black;
    width: 520px;
    height: 520px;
    display: flex;
    flex-wrap: wrap;
}

.cell {
    border: 1px solid black;
    margin: 0;
    height: 50px;
    width: 50px;
}

.cell:hover {
    border: 1px solid black;
    background-color: rgb(139, 88, 139);
    margin: 0;
    height: 50px;
    width: 50px;
}

.ship {
    background-color: black;
    border: 1px solid white;
}

.discovered {
    background-color: grey;
}

.damaged {
    background-color: red;
}

.git-credit {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: rgb(76, 73, 73);
    color: white;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 0 5px rgb(86, 83, 83);
    grid-row: 3/4;
    grid-column: 1/3;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,yBAAyB;IACzB,uBAAuB;AAC3B;;AAEA;IACI,gBAAgB;IAChB,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,oBAAoB;IACpB,kBAAkB;IAClB,uBAAuB;IACvB,YAAY;IACZ,YAAY;IACZ,sCAAsC;IACtC,2BAA2B;AAC/B;;AAEA;;IAEI,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,iBAAiB;IACjB,6BAA6B;IAC7B,iBAAiB;IACjB,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,aAAa;IACb,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,uBAAuB;IACvB,SAAS;IACT,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,uBAAuB;IACvB,mCAAmC;IACnC,SAAS;IACT,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,uBAAuB;IACvB,uBAAuB;AAC3B;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;IACT,iCAAiC;IACjC,YAAY;IACZ,iCAAiC;IACjC,mCAAmC;IACnC,aAAa;IACb,gBAAgB;AACpB","sourcesContent":["body {\n    display: flex;\n    flex-direction: column;\n    /* align-items: center; */\n    justify-content: center;\n}\n\n.heading {\n    margin-top: 10px;\n    font-size: 80px;\n    text-align: center;\n}\n\n.message {\n    font-size: 40px;\n    text-align: center;\n}\n\n.toggler {\n    width: 100px;\n    justify-self: center;\n    align-self: center;\n    background-color: black;\n    color: white;\n    height: 50px;\n    transition: background-color 0.5s ease;\n    transition: color 0.5s ease;\n}\n\n.toggler:hover {\n\n    background-color: white;\n    color: black;\n}\n\n.gameboards {\n    display: flex;\n    border: 1px solid black;\n    min-width: 1300px;\n    justify-content: space-around;\n    padding-top: 50px;\n    padding-left: 200px;\n    padding-right: 200px;\n}\n\n.board {\n    border: 2px solid black;\n    width: 520px;\n    height: 520px;\n    display: flex;\n    flex-wrap: wrap;\n}\n\n.cell {\n    border: 1px solid black;\n    margin: 0;\n    height: 50px;\n    width: 50px;\n}\n\n.cell:hover {\n    border: 1px solid black;\n    background-color: rgb(139, 88, 139);\n    margin: 0;\n    height: 50px;\n    width: 50px;\n}\n\n.ship {\n    background-color: black;\n    border: 1px solid white;\n}\n\n.discovered {\n    background-color: grey;\n}\n\n.damaged {\n    background-color: red;\n}\n\n.git-credit {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n    background-color: rgb(76, 73, 73);\n    color: white;\n    font-family: 'Roboto', sans-serif;\n    box-shadow: 0 0 5px rgb(86, 83, 83);\n    grid-row: 3/4;\n    grid-column: 1/3;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDL0I7SUFDRCxJQUFJLENBQUNpQixLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RyxJQUFJLENBQUNmLGdCQUFnQixHQUFHLENBQUM7SUFDekIsSUFBSSxDQUFDVSxZQUFZLEdBQUcsWUFBWTtFQUNsQztFQUVBRCxt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Ozs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2RvbV9oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXJBLCBjb21wdXRlciB9IGZyb20gXCIuXCJcbmxldCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyXCIpXG5sZXQgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJcIilcbmxldCBtZXNzYWdlSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZVwiKVxubGV0IHBvc2l0aW9uVG9nZ2xlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlclwiKVxuXG5jb25zdCBib2FyZFJlbmRlcmVyID0gZnVuY3Rpb24gKHBsYXllcikge1xuICAgIGJvYXJkUmVmcmVzaGVyKHBsYXllcilcbiAgICAvL3JlbmRlcmluZyBwbGF5ZXIgYm9hcmRcbiAgICBmb3IgKGxldCBpPTA7IGk8MTA7IGkrKykge1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaj0wOyBqPDEwOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGBjJHtpfSR7an1gKVxuICAgICAgICAgICAgLy8gY2VsbC5pZCA9IGAke2l9JHtqfWBcbiAgICAgICAgICAgIC8vdGFraW5nIGRhdGEgZnJvbSBnYW1lYmFvcmRcbiAgICAgICAgICAgIGxldCBjZWxsVmFsdWUgPSBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW2ldW2pdXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY29uZGl0aW9uIGZvciBhcHByb3ByaWF0ZSBhZGRpdGlvbiBvZiBkYXRhIG9uIHByb3BlciBib2FyZFxuICAgICAgICAgICAgaWYgKHBsYXllci5pc0NvbXB1dGVyPT09ZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2goY2VsbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8wIGlzIG5vcm1hbCBjZWxsXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ25vcm1hbCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLzEgaXMgZGlzY292ZXJlZCBlbXB0eSBjZWxsXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2Rpc2NvdmVyZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy94IGlzIGRhbWFnZWQgc2hpcCBjZWxsXG4gICAgICAgICAgICAgICAgY2FzZSAneCc6XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZGFtYWdlZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL3NoaXAgaXMgb25seSB2aXNpYmxlIGlmIGl0IGlzIG5vdCBhIGNvbXB1dGVyIHBsYXllclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLmlzQ29tcHV0ZXI9PT1mYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2FzIHRoZSBsb2FkaW5nIGxvb3AgZW5kcywgYWRkIGV2ZW50IGxpc3RlbmVycyB0byBlYWNoIGNlbGxcbiAgICAvL2NvbmRpdGlvbmFsIGZvciBzdG9wcGluZyBldmVudGxpc3RlbmVyIGFkZGl0aW9uIG9uY2UgYWxsIHBsYXllciBzaGlwcyBhcmUgcGxhY2VkXG4gICAgaWYgKHBsYXllci5nYW1lYm9hcmQuY3VycmVudFNoaXBJbmRleDw1ICYmIHBsYXllci5pc0NvbXB1dGVyPT09ZmFsc2UpIHtcbiAgICAgICAgZXZlbnRMaXN0ZW5lckFkZGVyKHBsYXllciwgXCJwbGFjZW1lbnRcIilcbiAgICB9IGVsc2Uge1xuICAgICAgICBldmVudExpc3RlbmVyQWRkZXIocGxheWVyLCBcImF0dGFja1wiKVxuICAgIH0gXG59XG5cbmNvbnN0IGJvYXJkUmVmcmVzaGVyID0gZnVuY3Rpb24gKHBsYXllcikge1xuICAgICAgICAvL2NsZWFuaW5nIG9sZCBkYXRhIG9uIGh0bWwsIGNvbmRpdGlvbiBmb3Igc2VsZWN0aW5nIGJvYXJkc1xuICAgIGlmIChwbGF5ZXIuaXNDb21wdXRlcj09PWZhbHNlKSB7XG4gICAgICAgIHBsYXllckJvYXJkLmlubmVyVGV4dCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5pbm5lclRleHQgPSAnJ1xuICAgIH1cbn1cblxuY29uc3QgZXZlbnRMaXN0ZW5lckFkZGVyID0gZnVuY3Rpb24gKHBsYXllciwgdHlwZSkge1xuICAgIGZvciAobGV0IGk9MDsgaTwxMDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGo9MDsgajwxMDsgaisrKSB7XG5cbiAgICAgICAgICAgIGxldCBjZWxsXG4gICAgICAgICAgICAvLyAvL2NvbmRpdGlvbmFsIHRvIHNlbGVjdCBhcHByb3ByaWF0ZSBjZWxsLCBjb21wdXRlciBvciBwbGF5ZXJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNDb21wdXRlcj09PXRydWUpIHtcbiAgICAgICAgICAgICAgICBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbXB1dGVyIC5jJHtpfSR7an1gKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuYyR7aX0ke2p9YClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy90d28gdHlwZXMgb2YgZXZlbnRMaXN0ZW5lcnMsIGlmIHBsYWNlbWVudCB0aGFuIGl0IFxuICAgICAgICAgICAgLy9kZXRlY3RzIGNsaWNrIGFuZCBwbGFjZXMgc2hpcCwgb3RoZXJ3aXNlIGl0IHRyaWdnZXIgYXR0YWNrXG4gICAgICAgICAgICBpZiAodHlwZT09PSdwbGFjZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7IFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChpLGopXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkUmVuZGVyZXIocGxheWVyKVxuICAgICAgICAgICAgICAgICAgICAvL3doZW4gNSBzaGlwcyBhcmUgcGxhY2VkIHJldmVhbCBjb21wdXRlciBib2FyZFxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5jdXJyZW50U2hpcEluZGV4PT09NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkUmVuZGVyZXIoY29tcHV0ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudExpc3RlbmVyQWRkZXIoY29tcHV0ZXIsIFwiYXR0YWNrXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlSGVhZGluZy5pbm5lclRleHQgPVwiQmVnaW4gYXR0YWNraW5nIG9wcG9uZW50J3Mgc2hpcCAhXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGU9PT0nYXR0YWNrJykge1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGksailcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRSZW5kZXJlcihwbGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBsYXllci5nYW1lYm9hcmQuYm9hcmQpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5wb3NpdGlvblRvZ2dsZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwbGF5ZXJBLmdhbWVib2FyZC5zaGlwUG9zaXRpb25Ub2dnbGVyKClcbiAgICBwb3NpdGlvblRvZ2dsZXJCdXR0b24uaW5uZXJUZXh0ID0gcGxheWVyQS5nYW1lYm9hcmQuc2hpcFBvc2l0aW9uXG59KVxuXG5leHBvcnQge2JvYXJkUmVuZGVyZXJ9IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gaGVyZSBudWxsIGlzIHVuZGlzY292ZXJkIGNlbGxcbiAgICAvLyBhIDUsNSw1LDUsNSBzZXJpZXMgb2YgY2VsbCBpbmRpY2F0ZXMgYSBob3Jpem9udGFsbHkgcGxhY2VkIHNoaXAgd2l0aCA1IGxlbmd0aFxuICAgIHRoaXMuYm9hcmQgPSBbXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgXTtcbiAgICB0aGlzLnNoaXBzID0gW3RoaXMuc2hpcE1ha2VyKDUpLCB0aGlzLnNoaXBNYWtlcig0KSwgdGhpcy5zaGlwTWFrZXIoMyksIHRoaXMuc2hpcE1ha2VyKDMpLCB0aGlzLnNoaXBNYWtlcigyKV07XG4gICAgdGhpcy5jdXJyZW50U2hpcEluZGV4ID0gMDtcbiAgICB0aGlzLnNoaXBQb3NpdGlvbiA9ICdob3Jpem9udGFsJztcbiAgfVxuXG4gIHNoaXBQb3NpdGlvblRvZ2dsZXIoKSB7XG4gICAgaWYgKHRoaXMuc2hpcFBvc2l0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMuc2hpcFBvc2l0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGlwUG9zaXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwKHZlcnRpY2FsSW5kZXgsIGhvcml6b250YWxJbmRleCkge1xuICAgIC8vY29uZGl0aW9uYWwgZm9yIHBsYWNpbmcgb25seSA1IHNoaXBzXG4gICAgaWYgKHRoaXMuY3VycmVudFNoaXBJbmRleDw1KSB7XG4gICAgbGV0IGN1cnJlbnRTaGlwTGVuZ3RoID0gdGhpcy5zaGlwc1t0aGlzLmN1cnJlbnRTaGlwSW5kZXhdLmxlbmd0aFxuICAgIFxuICAgIC8vdmFyaWFibGUgbXVzdCBiZSB0cnVlIGZvciBlbnRlcmluZyB0aGUgcGxhY2VtZW50IGxvb3BcbiAgICBsZXQgaXNDZWxsVmFsaWQgPSBmYWxzZVxuICAgIGZvciAobGV0IGk9MDsgaTxjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAvL2NvbmRpdGlvbmFsIGZvciBob3Jpem9udGFsXG4gICAgICBpZiAodGhpcy5zaGlwUG9zaXRpb249PT0naG9yaXpvbnRhbCcpIHtcbiAgICAgICAgaWYgKGhvcml6b250YWxJbmRleCtpPDEwICYmIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF1baG9yaXpvbnRhbEluZGV4K2ldID09PTApIHtcbiAgICAgICAgICBpc0NlbGxWYWxpZCA9IHRydWUgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQ2VsbFZhbGlkID0gZmFsc2VcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgfSBlbHNlIHtcbiAgICAgIC8vY29uZGl0aW9uYWwgZm9yIHZlcnRpY2FsXG4gICAgICAgIGlmICh2ZXJ0aWNhbEluZGV4K2k8MTAgJiYgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4K2ldW2hvcml6b250YWxJbmRleF09PT0wKSB7XG4gICAgICAgICAgaXNDZWxsVmFsaWQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNDZWxsVmFsaWQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaWYgKGlzQ2VsbFZhbGlkKSB7XG4gICAgICBmb3IgKGxldCBpPTA7IGk8Y3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAvL2ZvciBob3Jpem9udGFsXG4gICAgICAgIGlmICh0aGlzLnNoaXBQb3NpdGlvbj09PSdob3Jpem9udGFsJykge1xuICAgICAgICAgIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF0uc3BsaWNlKGhvcml6b250YWxJbmRleCtpLDEsY3VycmVudFNoaXBMZW5ndGgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4K2ldLnNwbGljZShob3Jpem9udGFsSW5kZXgsMSxjdXJyZW50U2hpcExlbmd0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50U2hpcEluZGV4KytcbiAgICB9IFxuICB9fVxuXG5cblxuICBzaGlwTWFrZXIobGVuZ3RoKSB7XG4gICAgbGV0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgIHJldHVybiBzaGlwXG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHZlcnRpY2FsSW5kZXgsIGhvcml6b250YWxJbmRleCkge1xuICAgIC8vaWYgdGhlIHRhcmdldCBjb3JkaW5hdGUgaXMgZW1wdHksIG1hcmsgaXQgYXMgJzEnIHNvIHRoYXQgaXQgaXMgcmVjb2duaXNlZCBhcyBkaXNjb3ZlcmVkIGNlbGxcbiAgICBpZiAodGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4XVtob3Jpem9udGFsSW5kZXhdPT09MCkge1xuICAgICAgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4XS5zcGxpY2UoaG9yaXpvbnRhbEluZGV4LDEsMSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF1baG9yaXpvbnRhbEluZGV4XSE9PSd4JyAmJlxuICAgICAgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4XVtob3Jpem9udGFsSW5kZXhdIT09MVxuICAgICkge1xuICAgICAgLy9iZWZvcmUgY2hhbmdpbmcgdGhlIGNlbGwgdGFrZSB0aGUgaW5mbyBhbmQgc3RvcmUgdGhlIGhpdCBvbiB0aGF0IHNwZWNpZmljIHNoaXBcbiAgICAgIFxuICAgICAgbGV0IGluZGV4T2ZTaGlwID0gNSAtIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF1baG9yaXpvbnRhbEluZGV4XVxuICAgICAgdGhpcy5zaGlwc1tpbmRleE9mU2hpcF0uaGl0KClcbiAgICAgIC8vY2hhbmdlIHRoZSB0YXJnZXQgY29yZGluYXRlIHRvICd4JyBzbyB0aGF0IGl0IGlzIG1hcmtlZCBhcyBhIGRhbWFnZWQgc2hpcCwgXG4gICAgICB0aGlzLmJvYXJkW3ZlcnRpY2FsSW5kZXhdLnNwbGljZShob3Jpem9udGFsSW5kZXgsMSwneCcpXG5cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcydcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBib2FyZFJlbmRlcmVyIH0gZnJvbSAnLi9kb21faGFuZGxlcic7XG5cblxubGV0IHBsYXllckEgPSBuZXcgUGxheWVyKClcbmxldCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoKVxuY29tcHV0ZXIuaXNDb21wdXRlciA9IHRydWVcblxuLy9wbGFjaW5nIGNvbXB1dGVyIHNoaXBzXG5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKDAsIDMpXG5jb21wdXRlci5nYW1lYm9hcmQuc2hpcFBvc2l0aW9uVG9nZ2xlcigpXG5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKDQsNSlcbmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoMiwxKVxuY29tcHV0ZXIuZ2FtZWJvYXJkLnNoaXBQb3NpdGlvblRvZ2dsZXIoKVxuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCg4LDEpXG5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKDksOClcblxuYm9hcmRSZW5kZXJlcihwbGF5ZXJBKVxuXG4vL3N0YXJ0aW5nIGEgcm91bmRcblxuXG5cbmV4cG9ydCB7cGxheWVyQSwgY29tcHV0ZXJ9XG5cblxuXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgdGhpcy53aW5TdGF0dXMgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ29tcHV0ZXIgPSBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNsYXNzIFNoaXAge1xuICAvLyBhIHNoaXAgc2hhbGwgaGF2ZSBsZW5naHQgYW5kIGEgc2luayBzdGF0dXNcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBzaW5rU3RhdHVzID0gZmFsc2UpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnNpbmtTdGF0dXMgPSBzaW5rU3RhdHVzO1xuICB9XG5cbiAgLy8gaWYgbGVuZ3RoIGJlY29tZXMgemVybyBpdCBzaGFsbCByZXR1cm4gdHJ1ZVxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgLy8gZXZlcnkgaGl0IHJlZHVjZXMgdGhlIGxlbmd0aCBieSAxXG4gIGhpdCgpIHtcbiAgICB0aGlzLmxlbmd0aCAtPSAxO1xuICAgIGlmICh0aGlzLmlzU3VuaygpKSB7XG4gICAgICB0aGlzLnNpbmtTdGF0dXMgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGJvZHkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAvKiBhbGlnbi1pdGVtczogY2VudGVyOyAqL1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uaGVhZGluZyB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICBmb250LXNpemU6IDgwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubWVzc2FnZSB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRvZ2dsZXIge1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGhlaWdodDogNTBweDtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZTtcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2U7XG59XG5cbi50b2dnbGVyOmhvdmVyIHtcblxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmdhbWVib2FyZHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgbWluLXdpZHRoOiAxMzAwcHg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgcGFkZGluZy10b3A6IDUwcHg7XG4gICAgcGFkZGluZy1sZWZ0OiAyMDBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMDBweDtcbn1cblxuLmJvYXJkIHtcbiAgICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcbiAgICB3aWR0aDogNTIwcHg7XG4gICAgaGVpZ2h0OiA1MjBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmNlbGwge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgIG1hcmdpbjogMDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgd2lkdGg6IDUwcHg7XG59XG5cbi5jZWxsOmhvdmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTM5LCA4OCwgMTM5KTtcbiAgICBtYXJnaW46IDA7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiA1MHB4O1xufVxuXG4uc2hpcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG59XG5cbi5kaXNjb3ZlcmVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufVxuXG4uZGFtYWdlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uZ2l0LWNyZWRpdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsIDczLCA3Myk7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYig4NiwgODMsIDgzKTtcbiAgICBncmlkLXJvdzogMy80O1xuICAgIGdyaWQtY29sdW1uOiAxLzM7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix5QkFBeUI7SUFDekIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixZQUFZO0lBQ1osc0NBQXNDO0lBQ3RDLDJCQUEyQjtBQUMvQjs7QUFFQTs7SUFFSSx1QkFBdUI7SUFDdkIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLDZCQUE2QjtJQUM3QixpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixlQUFlO0FBQ25COztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFNBQVM7SUFDVCxZQUFZO0lBQ1osV0FBVztBQUNmOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLG1DQUFtQztJQUNuQyxTQUFTO0lBQ1QsWUFBWTtJQUNaLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixTQUFTO0lBQ1QsaUNBQWlDO0lBQ2pDLFlBQVk7SUFDWixpQ0FBaUM7SUFDakMsbUNBQW1DO0lBQ25DLGFBQWE7SUFDYixnQkFBZ0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIC8qIGFsaWduLWl0ZW1zOiBjZW50ZXI7ICovXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uaGVhZGluZyB7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICAgIGZvbnQtc2l6ZTogODBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4udG9nZ2xlciB7XFxuICAgIHdpZHRoOiAxMDBweDtcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZTtcXG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlO1xcbn1cXG5cXG4udG9nZ2xlcjpob3ZlciB7XFxuXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBjb2xvcjogYmxhY2s7XFxufVxcblxcbi5nYW1lYm9hcmRzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIG1pbi13aWR0aDogMTMwMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgcGFkZGluZy10b3A6IDUwcHg7XFxuICAgIHBhZGRpbmctbGVmdDogMjAwcHg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDIwMHB4O1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gICAgd2lkdGg6IDUyMHB4O1xcbiAgICBoZWlnaHQ6IDUyMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG59XFxuXFxuLmNlbGw6aG92ZXIge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEzOSwgODgsIDEzOSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxufVxcblxcbi5kaXNjb3ZlcmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLmRhbWFnZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5naXQtY3JlZGl0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMTBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc2LCA3MywgNzMpO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2IoODYsIDgzLCA4Myk7XFxuICAgIGdyaWQtcm93OiAzLzQ7XFxuICAgIGdyaWQtY29sdW1uOiAxLzM7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJwbGF5ZXJBIiwiY29tcHV0ZXIiLCJwbGF5ZXJCb2FyZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbXB1dGVyQm9hcmQiLCJtZXNzYWdlSGVhZGluZyIsInBvc2l0aW9uVG9nZ2xlckJ1dHRvbiIsImJvYXJkUmVuZGVyZXIiLCJwbGF5ZXIiLCJib2FyZFJlZnJlc2hlciIsImkiLCJqIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjZWxsVmFsdWUiLCJnYW1lYm9hcmQiLCJib2FyZCIsImlzQ29tcHV0ZXIiLCJhcHBlbmRDaGlsZCIsImN1cnJlbnRTaGlwSW5kZXgiLCJldmVudExpc3RlbmVyQWRkZXIiLCJpbm5lclRleHQiLCJ0eXBlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBsYWNlU2hpcCIsInJlY2VpdmVBdHRhY2siLCJjb25zb2xlIiwibG9nIiwic2hpcFBvc2l0aW9uVG9nZ2xlciIsInNoaXBQb3NpdGlvbiIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsInNoaXBzIiwic2hpcE1ha2VyIiwidmVydGljYWxJbmRleCIsImhvcml6b250YWxJbmRleCIsImN1cnJlbnRTaGlwTGVuZ3RoIiwibGVuZ3RoIiwiaXNDZWxsVmFsaWQiLCJzcGxpY2UiLCJzaGlwIiwiaW5kZXhPZlNoaXAiLCJoaXQiLCJQbGF5ZXIiLCJ3aW5TdGF0dXMiLCJzaW5rU3RhdHVzIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiaXNTdW5rIl0sInNvdXJjZVJvb3QiOiIifQ==