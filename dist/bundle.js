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
  eventListenerAdder(player);
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
        console.log(player.gameboard.board);
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
    //only place ship if cell is 0

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

.gamebaords {
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

.ship {
    background-color: black;
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,yBAAyB;IACzB,uBAAuB;AAC3B;;AAEA;IACI,gBAAgB;IAChB,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,iBAAiB;IACjB,6BAA6B;IAC7B,iBAAiB;IACjB,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,aAAa;IACb,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,uBAAuB;IACvB,SAAS;IACT,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;IACT,iCAAiC;IACjC,YAAY;IACZ,iCAAiC;IACjC,mCAAmC;IACnC,aAAa;IACb,gBAAgB;AACpB","sourcesContent":["body {\n    display: flex;\n    flex-direction: column;\n    /* align-items: center; */\n    justify-content: center;\n}\n\n.heading {\n    margin-top: 10px;\n    font-size: 80px;\n    text-align: center;\n}\n\n.message {\n    font-size: 40px;\n    text-align: center;\n}\n\n.gamebaords {\n    display: flex;\n    border: 1px solid black;\n    min-width: 1300px;\n    justify-content: space-around;\n    padding-top: 50px;\n    padding-left: 200px;\n    padding-right: 200px;\n}\n\n.board {\n    border: 2px solid black;\n    width: 520px;\n    height: 520px;\n    display: flex;\n    flex-wrap: wrap;\n}\n\n.cell {\n    border: 1px solid black;\n    margin: 0;\n    height: 50px;\n    width: 50px;\n}\n\n.ship {\n    background-color: black;\n}\n\n.discovered {\n    background-color: grey;\n}\n\n.damaged {\n    background-color: red;\n}\n\n.git-credit {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n    background-color: rgb(76, 73, 73);\n    color: white;\n    font-family: 'Roboto', sans-serif;\n    box-shadow: 0 0 5px rgb(86, 83, 83);\n    grid-row: 3/4;\n    grid-column: 1/3;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDL0I7SUFDRCxJQUFJLENBQUNlLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVHLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUcsQ0FBQztJQUN6QixJQUFJLENBQUNO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LGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZG9tX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXllckEgfSBmcm9tIFwiLlwiXG5sZXQgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllclwiKVxubGV0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyXCIpXG5sZXQgcG9zaXRpb25Ub2dnbGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGVyXCIpXG5cbmNvbnN0IGJvYXJkUmVuZGVyZXIgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gICAgYm9hcmRSZWZyZXNoZXIocGxheWVyKVxuICAgIC8vcmVuZGVyaW5nIHBsYXllciBib2FyZFxuICAgIGZvciAobGV0IGk9MDsgaTwxMDsgaSsrKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBqPTA7IGo8MTA7IGorKykge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gICAgICAgICAgICBjZWxsLmlkID0gYCR7aX0ke2p9YFxuICAgICAgICAgICAgLy90YWtpbmcgZGF0YSBmcm9tIGdhbWViYW9yZFxuICAgICAgICAgICAgbGV0IGNlbGxWYWx1ZSA9IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbaV1bal1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHBsYXllci5pc0NvbXB1dGVyPT09ZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoKGNlbGxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vMCBpcyBub3JtYWwgY2VsbFxuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdub3JtYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8xIGlzIGRpc2NvdmVyZWQgZW1wdHkgY2VsbFxuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdkaXNjb3ZlcmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8veCBpcyBkYW1hZ2VkIHNoaXAgY2VsbFxuICAgICAgICAgICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2RhbWFnZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9zaGlwIGlzIG9ubHkgdmlzaWJsZSBpZiBpdCBpcyBub3QgYSBjb21wdXRlciBwbGF5ZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5pc0NvbXB1dGVyPT09ZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9hcyB0aGUgbG9hZGluZyBsb29wIGVuZHMsIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gZWFjaCBjZWxsXG4gICAgZXZlbnRMaXN0ZW5lckFkZGVyKHBsYXllcilcblxufVxuXG5jb25zdCBib2FyZFJlZnJlc2hlciA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgICAgICAgLy9jbGVhbmluZyBvbGQgZGF0YSBvbiBodG1sXG4gICAgaWYgKHBsYXllci5pc0NvbXB1dGVyPT09ZmFsc2UpIHtcbiAgICAgICAgcGxheWVyQm9hcmQuaW5uZXJUZXh0ID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb21wdXRlckJvYXJkLmlubmVyVGV4dCA9ICcnXG4gICAgfVxufVxuXG5jb25zdCBldmVudExpc3RlbmVyQWRkZXIgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gICAgZm9yIChsZXQgaT0wOyBpPDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaj0wOyBqPDEwOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aX0ke2p9YClcblxuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7IFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChpLGopXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkUmVuZGVyZXIocGxheWVyKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5wb3NpdGlvblRvZ2dsZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwbGF5ZXJBLmdhbWVib2FyZC5zaGlwUG9zaXRpb25Ub2dnbGVyKClcbiAgICBwb3NpdGlvblRvZ2dsZXJCdXR0b24uaW5uZXJUZXh0ID0gcGxheWVyQS5nYW1lYm9hcmQuc2hpcFBvc2l0aW9uXG59KVxuXG5leHBvcnQge2JvYXJkUmVuZGVyZXIsIGV2ZW50TGlzdGVuZXJBZGRlcn0iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBoZXJlIG51bGwgaXMgdW5kaXNjb3ZlcmQgY2VsbFxuICAgIC8vIGEgNSw1LDUsNSw1IHNlcmllcyBvZiBjZWxsIGluZGljYXRlcyBhIGhvcml6b250YWxseSBwbGFjZWQgc2hpcCB3aXRoIDUgbGVuZ3RoXG4gICAgdGhpcy5ib2FyZCA9IFtcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBdO1xuICAgIHRoaXMuc2hpcHMgPSBbdGhpcy5zaGlwTWFrZXIoNSksIHRoaXMuc2hpcE1ha2VyKDQpLCB0aGlzLnNoaXBNYWtlcigzKSwgdGhpcy5zaGlwTWFrZXIoMyksIHRoaXMuc2hpcE1ha2VyKDIpXTtcbiAgICB0aGlzLmN1cnJlbnRTaGlwSW5kZXggPSAwO1xuICAgIHRoaXMuc2hpcFBvc2l0aW9uID0gJ2hvcml6b250YWwnO1xuICB9XG5cbiAgc2hpcFBvc2l0aW9uVG9nZ2xlcigpIHtcbiAgICBpZiAodGhpcy5zaGlwUG9zaXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy5zaGlwUG9zaXRpb24gPSAndmVydGljYWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNoaXBQb3NpdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAodmVydGljYWxJbmRleCwgaG9yaXpvbnRhbEluZGV4KSB7XG4gICAgLy9vbmx5IHBsYWNlIHNoaXAgaWYgY2VsbCBpcyAwXG4gICAgXG4gICAgbGV0IGN1cnJlbnRTaGlwTGVuZ3RoID0gdGhpcy5zaGlwc1t0aGlzLmN1cnJlbnRTaGlwSW5kZXhdLmxlbmd0aFxuICAgIC8vdmFyaWFibGUgbXVzdCBiZSB0cnVlIGZvciBlbnRlcmluZyB0aGUgcGxhY2VtZW50IGxvb3BcbiAgICBsZXQgaXNDZWxsVmFsaWQgPSBmYWxzZVxuICAgIGZvciAobGV0IGk9MDsgaTxjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAvL2NvbmRpdGlvbmFsIGZvciBob3Jpem9udGFsXG4gICAgICBpZiAodGhpcy5zaGlwUG9zaXRpb249PT0naG9yaXpvbnRhbCcpIHtcbiAgICAgICAgaWYgKGhvcml6b250YWxJbmRleCtpPDEwICYmIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF1baG9yaXpvbnRhbEluZGV4K2ldID09PTApIHtcbiAgICAgICAgICBpc0NlbGxWYWxpZCA9IHRydWUgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQ2VsbFZhbGlkID0gZmFsc2VcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgfSBlbHNlIHtcbiAgICAgIC8vY29uZGl0aW9uYWwgZm9yIHZlcnRpY2FsXG4gICAgICAgIGlmICh2ZXJ0aWNhbEluZGV4K2k8MTAgJiYgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4K2ldW2hvcml6b250YWxJbmRleF09PT0wKSB7XG4gICAgICAgICAgaXNDZWxsVmFsaWQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNDZWxsVmFsaWQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaWYgKGlzQ2VsbFZhbGlkKSB7XG4gICAgICBmb3IgKGxldCBpPTA7IGk8Y3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAvL2ZvciBob3Jpem9udGFsXG4gICAgICAgIGlmICh0aGlzLnNoaXBQb3NpdGlvbj09PSdob3Jpem9udGFsJykge1xuICAgICAgICAgIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF0uc3BsaWNlKGhvcml6b250YWxJbmRleCtpLDEsY3VycmVudFNoaXBMZW5ndGgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4K2ldLnNwbGljZShob3Jpem9udGFsSW5kZXgsMSxjdXJyZW50U2hpcExlbmd0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50U2hpcEluZGV4KytcbiAgICB9IFxuICB9XG5cblxuXG4gIHNoaXBNYWtlcihsZW5ndGgpIHtcbiAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG4gICAgcmV0dXJuIHNoaXBcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2sodmVydGljYWxJbmRleCwgaG9yaXpvbnRhbEluZGV4KSB7XG4gICAgLy9pZiB0aGUgdGFyZ2V0IGNvcmRpbmF0ZSBpcyBlbXB0eSwgbWFyayBpdCBhcyAnMScgc28gdGhhdCBpdCBpcyByZWNvZ25pc2VkIGFzIGRpc2NvdmVyZWQgY2VsbFxuICAgIGlmICh0aGlzLmJvYXJkW3ZlcnRpY2FsSW5kZXhdW2hvcml6b250YWxJbmRleF09PT0wKSB7XG4gICAgICB0aGlzLmJvYXJkW3ZlcnRpY2FsSW5kZXhdLnNwbGljZShob3Jpem9udGFsSW5kZXgsMSwxKVxuICAgIH0gZWxzZSB7XG4gICAgICAvL2JlZm9yZSBjaGFuZ2luZyB0aGUgY2VsbCB0YWtlIHRoZSBpbmZvIGFuZCBzdG9yZSB0aGUgaGl0IG9uIHRoYXQgc3BlY2lmaWMgc2hpcFxuICAgICAgXG4gICAgICBsZXQgaW5kZXhPZlNoaXAgPSA1IC0gdGhpcy5ib2FyZFt2ZXJ0aWNhbEluZGV4XVtob3Jpem9udGFsSW5kZXhdXG4gICAgICB0aGlzLnNoaXBzW2luZGV4T2ZTaGlwXS5oaXQoKVxuICAgICAgLy9jaGFuZ2UgdGhlIHRhcmdldCBjb3JkaW5hdGUgdG8gJ3gnIHNvIHRoYXQgaXQgaXMgbWFya2VkIGFzIGEgZGFtYWdlZCBzaGlwLCBcbiAgICAgIHRoaXMuYm9hcmRbdmVydGljYWxJbmRleF0uc3BsaWNlKGhvcml6b250YWxJbmRleCwxLCd4JylcbiAgICAgIGlmICh0aGlzLnNoaXBzW2luZGV4T2ZTaGlwXS5pc1N1bmsoKSkge1xuICAgICAgICByZXR1cm4gJ3NoaXAgc3VuaydcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcydcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBib2FyZFJlbmRlcmVyLCBwb3NpdGlvbkJ1dHRvblRvZ2dsZXIgfSBmcm9tICcuL2RvbV9oYW5kbGVyJztcblxuXG5sZXQgcGxheWVyQSA9IG5ldyBQbGF5ZXIoKVxubGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcigpXG5jb21wdXRlci5pc0NvbXB1dGVyID0gdHJ1ZVxuXG4vL3BsYWNpbmcgY29tcHV0ZXIgc2hpcHNcbmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoMCwgMylcbmNvbXB1dGVyLmdhbWVib2FyZC5zaGlwUG9zaXRpb25Ub2dnbGVyKClcbmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoNCw1KVxuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgyLDEpXG5jb21wdXRlci5nYW1lYm9hcmQuc2hpcFBvc2l0aW9uVG9nZ2xlcigpXG5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKDgsMSlcbmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoOSw4KVxuLy8gY29uc29sZS5sb2coY29tcHV0ZXIuZ2FtZWJvYXJkKVxuXG4vL3BsYWNpbmcgcGxheWVyIHNoaXBzXG5cblxuXG5ib2FyZFJlbmRlcmVyKHBsYXllckEpXG4vLyBzaGlwUGxhY2VyKClcbi8vIGJvYXJkUmVuZGVyZXIoY29tcHV0ZXIpXG5cbmV4cG9ydCB7cGxheWVyQX1cblxuXG5cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLndpblN0YXR1cyA9IGZhbHNlO1xuICAgIHRoaXMuaXNDb21wdXRlciA9IGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY2xhc3MgU2hpcCB7XG4gIC8vIGEgc2hpcCBzaGFsbCBoYXZlIGxlbmdodCBhbmQgYSBzaW5rIHN0YXR1c1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIHNpbmtTdGF0dXMgPSBmYWxzZSkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuc2lua1N0YXR1cyA9IHNpbmtTdGF0dXM7XG4gIH1cblxuICAvLyBpZiBsZW5ndGggYmVjb21lcyB6ZXJvIGl0IHNoYWxsIHJldHVybiB0cnVlXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPT09IDA7XG4gIH1cblxuICAvLyBldmVyeSBoaXQgcmVkdWNlcyB0aGUgbGVuZ3RoIGJ5IDFcbiAgaGl0KCkge1xuICAgIHRoaXMubGVuZ3RoIC09IDE7XG4gICAgaWYgKHRoaXMuaXNTdW5rKCkpIHtcbiAgICAgIHRoaXMuc2lua1N0YXR1cyA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgYm9keSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIC8qIGFsaWduLWl0ZW1zOiBjZW50ZXI7ICovXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5oZWFkaW5nIHtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIGZvbnQtc2l6ZTogODBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5tZXNzYWdlIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZ2FtZWJhb3JkcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICBtaW4td2lkdGg6IDEzMDBweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDIwMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwMHB4O1xufVxuXG4uYm9hcmQge1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xuICAgIHdpZHRoOiA1MjBweDtcbiAgICBoZWlnaHQ6IDUyMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uY2VsbCB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgbWFyZ2luOiAwO1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogNTBweDtcbn1cblxuLnNoaXAge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuXG4uZGlzY292ZXJlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cblxuLmRhbWFnZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLmdpdC1jcmVkaXQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc2LCA3MywgNzMpO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2IoODYsIDgzLCA4Myk7XG4gICAgZ3JpZC1yb3c6IDMvNDtcbiAgICBncmlkLWNvbHVtbjogMS8zO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIseUJBQXlCO0lBQ3pCLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLDZCQUE2QjtJQUM3QixpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixlQUFlO0FBQ25COztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFNBQVM7SUFDVCxZQUFZO0lBQ1osV0FBVztBQUNmOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsU0FBUztJQUNULGlDQUFpQztJQUNqQyxZQUFZO0lBQ1osaUNBQWlDO0lBQ2pDLG1DQUFtQztJQUNuQyxhQUFhO0lBQ2IsZ0JBQWdCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAvKiBhbGlnbi1pdGVtczogY2VudGVyOyAqL1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmhlYWRpbmcge1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICBmb250LXNpemU6IDgwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgICBmb250LXNpemU6IDQwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmdhbWViYW9yZHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgbWluLXdpZHRoOiAxMzAwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcXG4gICAgcGFkZGluZy1sZWZ0OiAyMDBweDtcXG4gICAgcGFkZGluZy1yaWdodDogMjAwcHg7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbiAgICB3aWR0aDogNTIwcHg7XFxuICAgIGhlaWdodDogNTIwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbn1cXG5cXG4uc2hpcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uZGlzY292ZXJlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5kYW1hZ2VkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uZ2l0LWNyZWRpdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NiwgNzMsIDczKTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiKDg2LCA4MywgODMpO1xcbiAgICBncmlkLXJvdzogMy80O1xcbiAgICBncmlkLWNvbHVtbjogMS8zO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsicGxheWVyQSIsInBsYXllckJvYXJkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29tcHV0ZXJCb2FyZCIsInBvc2l0aW9uVG9nZ2xlckJ1dHRvbiIsImJvYXJkUmVuZGVyZXIiLCJwbGF5ZXIiLCJib2FyZFJlZnJlc2hlciIsImkiLCJqIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpZCIsImNlbGxWYWx1ZSIsImdhbWVib2FyZCIsImJvYXJkIiwiaXNDb21wdXRlciIsImFwcGVuZENoaWxkIiwiZXZlbnRMaXN0ZW5lckFkZGVyIiwiaW5uZXJUZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwicGxhY2VTaGlwIiwiY29uc29sZSIsImxvZyIsInNoaXBQb3NpdGlvblRvZ2dsZXIiLCJzaGlwUG9zaXRpb24iLCJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJzaGlwcyIsInNoaXBNYWtlciIsImN1cnJlbnRTaGlwSW5kZXgiLCJ2ZXJ0aWNhbEluZGV4IiwiaG9yaXpvbnRhbEluZGV4IiwiY3VycmVudFNoaXBMZW5ndGgiLCJsZW5ndGgiLCJpc0NlbGxWYWxpZCIsInNwbGljZSIsInNoaXAiLCJyZWNlaXZlQXR0YWNrIiwiaW5kZXhPZlNoaXAiLCJoaXQiLCJpc1N1bmsiLCJQbGF5ZXIiLCJwb3NpdGlvbkJ1dHRvblRvZ2dsZXIiLCJjb21wdXRlciIsIndpblN0YXR1cyIsInNpbmtTdGF0dXMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9