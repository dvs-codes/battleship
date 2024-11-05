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
/* harmony export */   boardRenderer: () => (/* binding */ boardRenderer),
/* harmony export */   eventListenerAdder: () => (/* binding */ eventListenerAdder)
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
      cell.id = `${i}${j}`;
      //taking data from gamebaord
      let cellValue = player.gameboard.board[i][j];
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
  if (player.gameboard.currentShipIndex < 5) {
    eventListenerAdder(player);
  }
};
const boardRefresher = function (player) {
  //cleaning old data on html
  if (player.isComputer === false) {
    playerBoard.innerText = '';
  } else {
    computerBoard.innerText = '';
  }
};
const eventListenerAdder = function (player) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.getElementById(`${i}${j}`);
      cell.addEventListener("click", () => {
        player.gameboard.placeShip(i, j);
        boardRenderer(player);
        //when 5 ships are placed reveal computer board
        if (player.gameboard.currentShipIndex === 5) {
          computerBoard.classList.add("board");
          boardRenderer(___WEBPACK_IMPORTED_MODULE_0__.computer);
          messageHeading.innerText = "Begin attacking opponent's ship !";
        }
      });
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
    } else {
      //before changing the cell take the info and store the hit on that specific ship

      let indexOfShip = 5 - this.board[verticalIndex][horizontalIndex];
      this.ships[indexOfShip].hit();
      //change the target cordinate to 'x' so that it is marked as a damaged ship, 
      this.board[verticalIndex].splice(horizontalIndex, 1, 'x');
      if (this.ships[indexOfShip].isSunk()) {
        return 'ship sunk';
      }
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
// console.log(computer.gameboard)

//placing player ships

(0,_dom_handler__WEBPACK_IMPORTED_MODULE_2__.boardRenderer)(playerA);
// shipPlacer()
// boardRenderer(computer)



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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,yBAAyB;IACzB,uBAAuB;AAC3B;;AAEA;IACI,gBAAgB;IAChB,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,iBAAiB;IACjB,6BAA6B;IAC7B,iBAAiB;IACjB,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,aAAa;IACb,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,uBAAuB;IACvB,SAAS;IACT,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,uBAAuB;IACvB,mCAAmC;IACnC,SAAS;IACT,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,uBAAuB;IACvB,uBAAuB;AAC3B;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;IACT,iCAAiC;IACjC,YAAY;IACZ,iCAAiC;IACjC,mCAAmC;IACnC,aAAa;IACb,gBAAgB;AACpB","sourcesContent":["body {\n    display: flex;\n    flex-direction: column;\n    /* align-items: center; */\n    justify-content: center;\n}\n\n.heading {\n    margin-top: 10px;\n    font-size: 80px;\n    text-align: center;\n}\n\n.message {\n    font-size: 40px;\n    text-align: center;\n}\n\n.gameboards {\n    display: flex;\n    border: 1px solid black;\n    min-width: 1300px;\n    justify-content: space-around;\n    padding-top: 50px;\n    padding-left: 200px;\n    padding-right: 200px;\n}\n\n.board {\n    border: 2px solid black;\n    width: 520px;\n    height: 520px;\n    display: flex;\n    flex-wrap: wrap;\n}\n\n.cell {\n    border: 1px solid black;\n    margin: 0;\n    height: 50px;\n    width: 50px;\n}\n\n.cell:hover {\n    border: 1px solid black;\n    background-color: rgb(139, 88, 139);\n    margin: 0;\n    height: 50px;\n    width: 50px;\n}\n\n.ship {\n    background-color: black;\n    border: 1px solid white;\n}\n\n.discovered {\n    background-color: grey;\n}\n\n.damaged {\n    background-color: red;\n}\n\n.git-credit {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n    background-color: rgb(76, 73, 73);\n    color: white;\n    font-family: 'Roboto', sans-serif;\n    box-shadow: 0 0 5px rgb(86, 83, 83);\n    grid-row: 3/4;\n    grid-column: 1/3;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDL0I7SUFDRCxJQUFJLENBQUNjLEtBQUssR0FBRyxD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UEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZG9tX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXllckEsIGNvbXB1dGVyIH0gZnJvbSBcIi5cIlxubGV0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJcIilcbmxldCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlclwiKVxubGV0IG1lc3NhZ2VIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlXCIpXG5sZXQgcG9zaXRpb25Ub2dnbGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGVyXCIpXG5cbmNvbnN0IGJvYXJkUmVuZGVyZXIgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gICAgYm9hcmRSZWZyZXNoZXIocGxheWVyKVxuICAgIC8vcmVuZGVyaW5nIHBsYXllciBib2FyZFxuICAgIGZvciAobGV0IGk9MDsgaTwxMDsgaSsrKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBqPTA7IGo8MTA7IGorKykge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gICAgICAgICAgICBjZWxsLmlkID0gYCR7aX0ke2p9YFxuICAgICAgICAgICAgLy90YWtpbmcgZGF0YSBmcm9tIGdhbWViYW9yZFxuICAgICAgICAgICAgbGV0IGNlbGxWYWx1ZSA9IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbaV1bal1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHBsYXllci5pc0NvbXB1dGVyPT09ZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoKGNlbGxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vMCBpcyBub3JtYWwgY2VsbFxuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdub3JtYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8xIGlzIGRpc2NvdmVyZWQgZW1wdHkgY2VsbFxuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdkaXNjb3ZlcmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8veCBpcyBkYW1hZ2VkIHNoaXAgY2VsbFxuICAgICAgICAgICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2RhbWFnZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9zaGlwIGlzIG9ubHkgdmlzaWJsZSBpZiBpdCBpcyBub3QgYSBjb21wdXRlciBwbGF5ZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5pc0NvbXB1dGVyPT09ZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9hcyB0aGUgbG9hZGluZyBsb29wIGVuZHMsIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gZWFjaCBjZWxsXG4gICAgaWYgKHBsYXllci5nYW1lYm9hcmQuY3VycmVudFNoaXBJbmRleDw1KSB7XG4gICAgICAgIGV2ZW50TGlzdGVuZXJBZGRlcihwbGF5ZXIpXG4gICAgfVxufVxuXG5jb25zdCBib2FyZFJlZnJlc2hlciA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgICAgICAgLy9jbGVhbmluZyBvbGQgZGF0YSBvbiBodG1sXG4gICAgaWYgKHBsYXllci5pc0NvbXB1dGVyPT09ZmFsc2UpIHtcbiAgICAgICAgcGxheWVyQm9hcmQuaW5uZXJUZXh0ID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb21wdXRlckJvYXJkLmlubmVyVGV4dCA9ICcnXG4gICAgfVxufVxuXG5jb25zdCBldmVudExpc3RlbmVyQWRkZXIgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gICAgZm9yIChsZXQgaT0wOyBpPDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaj0wOyBqPDEwOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aX0ke2p9YClcblxuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7IFxuICAgICAgICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKGksailcbiAgICAgICAgICAgICAgICBib2FyZFJlbmRlcmVyKHBsYXllcilcbiAgICAgICAgICAgICAgICAvL3doZW4gNSBzaGlwcyBhcmUgcGxhY2VkIHJldmVhbCBjb21wdXRlciBib2FyZFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLmN1cnJlbnRTaGlwSW5kZXg9PT01KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkUmVuZGVyZXIoY29tcHV0ZXIpXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VIZWFkaW5nLmlubmVyVGV4dCA9XCJCZWdpbiBhdHRhY2tpbmcgb3Bwb25lbnQncyBzaGlwICFcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxucG9zaXRpb25Ub2dnbGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcGxheWVyQS5nYW1lYm9hcmQuc2hpcFBvc2l0aW9uVG9nZ2xlcigpXG4gICAgcG9zaXRpb25Ub2dnbGVyQnV0dG9uLmlubmVyVGV4dCA9IHBsYXllckEuZ2FtZWJvYXJkLnNoaXBQb3NpdGlvblxufSlcblxuZXhwb3J0IHtib2FyZFJlbmRlcmVyLCBldmVudExpc3RlbmVyQWRkZXJ9IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gaGVyZSBudWxsIGlzIHVuZGlzY292ZXJkIGNlbGxcbiAgICAvLyBhIDUsNSw1LDUsNSBzZXJpZXMgb2YgY2VsbCBpbmRpY2F0ZXMgYSBob3Jpem9udGFsbHkgcGxhY2VkIHNoaXAgd2l0aCA1IGxlbmd0aFxuICAgIHRoaXMuYm9hcmQgPSBbXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgXTtcbiAgICB0aGlzLnNoaXBzID0gW3RoaXMuc2hpcE1ha2VyKDUpLCB0aGlzLnNoaXBNYWtlcig0KSwgdGhpcy5zaGlwTWFrZXIoMyksIHRoaXMuc2hpcE1ha2VyKDMpLCB0aGlzLnNoaXBNYWtlcigyKV07XG4gICAgdGhpcy5jdXJyZW50U2hpcEluZGV4ID0gMDtcbiAgICB0aGlzLnNoaXBQb3NpdGlvbiA9ICdob3Jpem9udGFsJztcbiAgfVxuXG4gIHNoaXBQb3NpdGlvblRvZ2dsZXIoKSB7XG4gICAgaWYgKHRoaXMuc2hpcFBvc2l0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMuc2hpcFBvc2l0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGlwUG9zaXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwKHZlcnRpY2FsSW5kZXgsIGhvcml6b250YWxJbmRleCkge1xuICAgIC8vY29uZGl0aW9uYWwgZm9yIHBsYWNpbmcgb25seSA1IHNoaXBzXG4gICAgaWYgKHRoaXMuY3VycmVudFNoaXBJbmRleDw1KSB7XG4gICAgbGV0IGN1cnJlbnRTaGlwTGVuZ3RoID0gdGhpcy5zaGlwc1t0aGlzLmN1cnJlbnRTaGlwSW5kZXhdLmxlbmd0aFxuICAgIFxuICAgIC8vdmFyaWFibGUgbXVzdCBiZSB0cnVlIGZvciBlbnRlcmluZyB0aGUgcGxhY2VtZW50IGxvb3BcbiAgICBsZXQgaXNDZWxsVmFsaWQgPSBmYWxzZVxuICAgIGZvciAobGV0IGk9MDsgaTxjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAvL2NvbmRpdGlvbmFsIGZvciBob3Jpem9udGFsXG4gICAgICBpZiAodGhpcy5zaGlwUG9zaXRpb249PT0naG9yaXpvbnRhbCcpIHtcbiAgICAgICAgaWYgKGhvcml6b250YWxJbmRleCtpPDEwICYmIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF1baG9yaXpvbnRhbEluZGV4K2ldID09PTApIHtcbiAgICAgICAgICBpc0NlbGxWYWxpZCA9IHRydWUgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQ2VsbFZhbGlkID0gZmFsc2VcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgfSBlbHNlIHtcbiAgICAgIC8vY29uZGl0aW9uYWwgZm9yIHZlcnRpY2FsXG4gICAgICAgIGlmICh2ZXJ0aWNhbEluZGV4K2k8MTAgJiYgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4K2ldW2hvcml6b250YWxJbmRleF09PT0wKSB7XG4gICAgICAgICAgaXNDZWxsVmFsaWQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNDZWxsVmFsaWQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaWYgKGlzQ2VsbFZhbGlkKSB7XG4gICAgICBmb3IgKGxldCBpPTA7IGk8Y3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAvL2ZvciBob3Jpem9udGFsXG4gICAgICAgIGlmICh0aGlzLnNoaXBQb3NpdGlvbj09PSdob3Jpem9udGFsJykge1xuICAgICAgICAgIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF0uc3BsaWNlKGhvcml6b250YWxJbmRleCtpLDEsY3VycmVudFNoaXBMZW5ndGgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4K2ldLnNwbGljZShob3Jpem9udGFsSW5kZXgsMSxjdXJyZW50U2hpcExlbmd0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50U2hpcEluZGV4KytcbiAgICB9IFxuICB9fVxuXG5cblxuICBzaGlwTWFrZXIobGVuZ3RoKSB7XG4gICAgbGV0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgIHJldHVybiBzaGlwXG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHZlcnRpY2FsSW5kZXgsIGhvcml6b250YWxJbmRleCkge1xuICAgIC8vaWYgdGhlIHRhcmdldCBjb3JkaW5hdGUgaXMgZW1wdHksIG1hcmsgaXQgYXMgJzEnIHNvIHRoYXQgaXQgaXMgcmVjb2duaXNlZCBhcyBkaXNjb3ZlcmVkIGNlbGxcbiAgICBpZiAodGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4XVtob3Jpem9udGFsSW5kZXhdPT09MCkge1xuICAgICAgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4XS5zcGxpY2UoaG9yaXpvbnRhbEluZGV4LDEsMSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy9iZWZvcmUgY2hhbmdpbmcgdGhlIGNlbGwgdGFrZSB0aGUgaW5mbyBhbmQgc3RvcmUgdGhlIGhpdCBvbiB0aGF0IHNwZWNpZmljIHNoaXBcbiAgICAgIFxuICAgICAgbGV0IGluZGV4T2ZTaGlwID0gNSAtIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF1baG9yaXpvbnRhbEluZGV4XVxuICAgICAgdGhpcy5zaGlwc1tpbmRleE9mU2hpcF0uaGl0KClcbiAgICAgIC8vY2hhbmdlIHRoZSB0YXJnZXQgY29yZGluYXRlIHRvICd4JyBzbyB0aGF0IGl0IGlzIG1hcmtlZCBhcyBhIGRhbWFnZWQgc2hpcCwgXG4gICAgICB0aGlzLmJvYXJkW3ZlcnRpY2FsSW5kZXhdLnNwbGljZShob3Jpem9udGFsSW5kZXgsMSwneCcpXG4gICAgICBpZiAodGhpcy5zaGlwc1tpbmRleE9mU2hpcF0uaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuICdzaGlwIHN1bmsnXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgYm9hcmRSZW5kZXJlciB9IGZyb20gJy4vZG9tX2hhbmRsZXInO1xuXG5cbmxldCBwbGF5ZXJBID0gbmV3IFBsYXllcigpXG5sZXQgY29tcHV0ZXIgPSBuZXcgUGxheWVyKClcbmNvbXB1dGVyLmlzQ29tcHV0ZXIgPSB0cnVlXG5cbi8vcGxhY2luZyBjb21wdXRlciBzaGlwc1xuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLCAzKVxuY29tcHV0ZXIuZ2FtZWJvYXJkLnNoaXBQb3NpdGlvblRvZ2dsZXIoKVxuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCg0LDUpXG5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKDIsMSlcbmNvbXB1dGVyLmdhbWVib2FyZC5zaGlwUG9zaXRpb25Ub2dnbGVyKClcbmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoOCwxKVxuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCg5LDgpXG4vLyBjb25zb2xlLmxvZyhjb21wdXRlci5nYW1lYm9hcmQpXG5cbi8vcGxhY2luZyBwbGF5ZXIgc2hpcHNcblxuXG5cbmJvYXJkUmVuZGVyZXIocGxheWVyQSlcbi8vIHNoaXBQbGFjZXIoKVxuLy8gYm9hcmRSZW5kZXJlcihjb21wdXRlcilcblxuZXhwb3J0IHtwbGF5ZXJBLCBjb21wdXRlcn1cblxuXG5cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLndpblN0YXR1cyA9IGZhbHNlO1xuICAgIHRoaXMuaXNDb21wdXRlciA9IGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY2xhc3MgU2hpcCB7XG4gIC8vIGEgc2hpcCBzaGFsbCBoYXZlIGxlbmdodCBhbmQgYSBzaW5rIHN0YXR1c1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIHNpbmtTdGF0dXMgPSBmYWxzZSkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuc2lua1N0YXR1cyA9IHNpbmtTdGF0dXM7XG4gIH1cblxuICAvLyBpZiBsZW5ndGggYmVjb21lcyB6ZXJvIGl0IHNoYWxsIHJldHVybiB0cnVlXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPT09IDA7XG4gIH1cblxuICAvLyBldmVyeSBoaXQgcmVkdWNlcyB0aGUgbGVuZ3RoIGJ5IDFcbiAgaGl0KCkge1xuICAgIHRoaXMubGVuZ3RoIC09IDE7XG4gICAgaWYgKHRoaXMuaXNTdW5rKCkpIHtcbiAgICAgIHRoaXMuc2lua1N0YXR1cyA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgYm9keSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIC8qIGFsaWduLWl0ZW1zOiBjZW50ZXI7ICovXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5oZWFkaW5nIHtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIGZvbnQtc2l6ZTogODBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5tZXNzYWdlIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZ2FtZWJvYXJkcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICBtaW4td2lkdGg6IDEzMDBweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDIwMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwMHB4O1xufVxuXG4uYm9hcmQge1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xuICAgIHdpZHRoOiA1MjBweDtcbiAgICBoZWlnaHQ6IDUyMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uY2VsbCB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgbWFyZ2luOiAwO1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogNTBweDtcbn1cblxuLmNlbGw6aG92ZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMzksIDg4LCAxMzkpO1xuICAgIG1hcmdpbjogMDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgd2lkdGg6IDUwcHg7XG59XG5cbi5zaGlwIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbn1cblxuLmRpc2NvdmVyZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbi5kYW1hZ2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5naXQtY3JlZGl0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAxMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NiwgNzMsIDczKTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiKDg2LCA4MywgODMpO1xuICAgIGdyaWQtcm93OiAzLzQ7XG4gICAgZ3JpZC1jb2x1bW46IDEvMztcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHlCQUF5QjtJQUN6Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQiw2QkFBNkI7SUFDN0IsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGFBQWE7SUFDYixhQUFhO0lBQ2IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixTQUFTO0lBQ1QsWUFBWTtJQUNaLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixtQ0FBbUM7SUFDbkMsU0FBUztJQUNULFlBQVk7SUFDWixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsU0FBUztJQUNULGlDQUFpQztJQUNqQyxZQUFZO0lBQ1osaUNBQWlDO0lBQ2pDLG1DQUFtQztJQUNuQyxhQUFhO0lBQ2IsZ0JBQWdCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAvKiBhbGlnbi1pdGVtczogY2VudGVyOyAqL1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmhlYWRpbmcge1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICBmb250LXNpemU6IDgwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgICBmb250LXNpemU6IDQwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVib2FyZHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgbWluLXdpZHRoOiAxMzAwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcXG4gICAgcGFkZGluZy1sZWZ0OiAyMDBweDtcXG4gICAgcGFkZGluZy1yaWdodDogMjAwcHg7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbiAgICB3aWR0aDogNTIwcHg7XFxuICAgIGhlaWdodDogNTIwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbn1cXG5cXG4uY2VsbDpob3ZlciB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTM5LCA4OCwgMTM5KTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbn1cXG5cXG4uc2hpcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG59XFxuXFxuLmRpc2NvdmVyZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4uZGFtYWdlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLmdpdC1jcmVkaXQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsIDczLCA3Myk7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYig4NiwgODMsIDgzKTtcXG4gICAgZ3JpZC1yb3c6IDMvNDtcXG4gICAgZ3JpZC1jb2x1bW46IDEvMztcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbInBsYXllckEiLCJjb21wdXRlciIsInBsYXllckJvYXJkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29tcHV0ZXJCb2FyZCIsIm1lc3NhZ2VIZWFkaW5nIiwicG9zaXRpb25Ub2dnbGVyQnV0dG9uIiwiYm9hcmRSZW5kZXJlciIsInBsYXllciIsImJvYXJkUmVmcmVzaGVyIiwiaSIsImoiLCJjZWxsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlkIiwiY2VsbFZhbHVlIiwiZ2FtZWJvYXJkIiwiYm9hcmQiLCJpc0NvbXB1dGVyIiwiYXBwZW5kQ2hpbGQiLCJjdXJyZW50U2hpcEluZGV4IiwiZXZlbnRMaXN0ZW5lckFkZGVyIiwiaW5uZXJUZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwicGxhY2VTaGlwIiwic2hpcFBvc2l0aW9uVG9nZ2xlciIsInNoaXBQb3NpdGlvbiIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsInNoaXBzIiwic2hpcE1ha2VyIiwidmVydGljYWxJbmRleCIsImhvcml6b250YWxJbmRleCIsImN1cnJlbnRTaGlwTGVuZ3RoIiwibGVuZ3RoIiwiaXNDZWxsVmFsaWQiLCJzcGxpY2UiLCJzaGlwIiwicmVjZWl2ZUF0dGFjayIsImluZGV4T2ZTaGlwIiwiaGl0IiwiaXNTdW5rIiwiUGxheWVyIiwid2luU3RhdHVzIiwic2lua1N0YXR1cyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCJdLCJzb3VyY2VSb290IjoiIn0=