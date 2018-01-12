/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cell; });
var Cell = /** @class */ (function () {
    // noinspection JSUnusedLocalSymbols
    function Cell(x, y) {
        this.x = Math.round(x);
        this.y = Math.round(y);
    }
    Cell.fromKey = function (key) {
        var cellXY = key.split(":");
        return Cell.ofStr(cellXY[0], cellXY[1]);
    };
    Cell.ofStr = function (x, y) {
        return new Cell(parseInt(x), parseInt(y));
    };
    Cell.of = function (x, y) {
        return new Cell(x, y);
    };
    Cell.prototype.asKey = function () {
        return this.x + ":" + this.y;
    };
    ;
    return Cell;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Grid__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Patterns__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Cell__ = __webpack_require__(0);
/*
 * Make ALL js related changes in a .ts file, it gives extra features and is compiled down to a .js file. The .js files *ARE GENERATED* So
 * don't modify the .js files, as your changes *WILL BE LOST* :P
 *
 * Let me know if you have ANY questions or would rather do something else! :)
 */



var MAX_SIZE = 2000;
var CELL_SIZE = 10;
var MAX_CELLS = MAX_SIZE / CELL_SIZE;
var W, H;
var CELLS_X, CELLS_Y;
var grid = new __WEBPACK_IMPORTED_MODULE_0__Grid__["a" /* Grid */](MAX_CELLS, CELL_SIZE);
function refreshSize() {
    var docBody = document.body;
    W = Math.min(docBody.clientWidth, MAX_SIZE);
    H = Math.min(docBody.clientHeight, MAX_SIZE);
    grid.setSize(W, H);
    CELLS_X = Math.round(W / CELL_SIZE);
    CELLS_Y = Math.round(H / CELL_SIZE);
}
window.onresize = function () {
    refreshSize();
    grid.draw();
};
function gameStart() {
    grid.start();
    document.querySelector("#play-icon").setAttribute("hidden", null);
    document.querySelector("#pause-icon").removeAttribute("hidden");
    var playPauseLabel = document.getElementById("playPauseLabel");
    playPauseLabel.innerText = "Pause";
}
function gameStop() {
    grid.stop();
    document.querySelector("#pause-icon").setAttribute("hidden", null);
    document.querySelector("#play-icon").removeAttribute("hidden");
    var playPauseLabel = document.getElementById("playPauseLabel");
    playPauseLabel.innerText = "Play";
}
window.onload = function () {
    window.resizeTo(766, 502);
    grid.setCanvas(document.querySelector("canvas"));
    grid.canvas.onclick = function (e) {
        //mouseclick position
        var mx = e.offsetX;
        var my = e.offsetY;
        //calculate grid square numbers rounded to the nearest ten
        var gx = Math.floor(mx / CELL_SIZE); //*10;
        var gy = Math.floor(my / CELL_SIZE); //*10;
        var cell = __WEBPACK_IMPORTED_MODULE_2__Cell__["a" /* Cell */].of(gx, gy);
        //if press an alive cell, kill it
        if (grid.isAlive(cell)) {
            grid.kill(cell);
            grid.draw();
        }
        else {
            grid.revive(cell);
            grid.draw();
        }
    };
    document.getElementById("resetBtn").onclick = function () {
        gameStop();
        initCells();
        grid.draw();
    };
    document.getElementById("step23Btn").onclick = function () {
        gameStop();
        for (var i = 0; i < 23; i++) {
            grid.step(false);
        }
        grid.draw();
    };
    document.getElementById("stepBtn").onclick = function () {
        gameStop();
        grid.step();
    };
    document.getElementById("clearBtn").onclick = function () {
        grid.clear();
        grid.draw();
        gameStop();
    };
    document.getElementById("playPause").onclick = function () {
        if (grid.isPlaying) {
            gameStop();
        }
        else {
            gameStart();
        }
    };
    refreshSize();
    initCells();
    grid.draw();
    gameStop();
};
function initCells() {
    grid.clear();
    __WEBPACK_IMPORTED_MODULE_1__Patterns__["a" /* Patterns */].getGliderGuns(CELLS_X, CELLS_Y).forEach(function (cell) { return grid.revive(cell); });
    // Patterns.hBar(CELLS_X, CELLS_Y).forEach(cell => grid.revive(cell));
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Grid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cell__ = __webpack_require__(0);
/**
 * Created by joshuaking on 11/7/17.
 */

var Grid = /** @class */ (function () {
    function Grid(maxCells, cellSize) {
        this._cells = [];
        this._maxCells = maxCells;
        this._cellSize = cellSize;
    }
    Object.defineProperty(Grid.prototype, "isPlaying", {
        get: function () {
            return this._isPlaying;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "cells", {
        get: function () {
            return this._cells;
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype.clear = function () {
        var _this = this;
        this.cells.forEach(function (cell) { return _this.kill(cell); });
    };
    Grid.prototype.revive = function (cell) {
        this.cells.push(cell);
    };
    Grid.prototype.kill = function (cell) {
        this._cells.splice(this._cells.indexOf(cell));
    };
    Grid.prototype.setCanvas = function (canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
    };
    Grid.prototype.setSize = function (width, height) {
        this._canvas.width = this._width = width;
        this._canvas.height = this._height = height;
        this._cellsX = Math.round(this._width / this._cellSize);
        this._cellsY = Math.round(this._height / this._cellSize);
    };
    Grid.prototype.draw = function () {
        this.clearRect();
        this.drawGrid();
        this.drawCells();
    };
    Grid.prototype.isAlive = function (cell) {
        return this._cells.filter(function (c) { return c.asKey() == cell.asKey(); }).length > 0;
    };
    Grid.prototype.step = function (callDrawWhenDone) {
        var _this = this;
        if (callDrawWhenDone === void 0) { callDrawWhenDone = true; }
        var grid = this;
        function _getNeighbors(cell) {
            var neighbors = [];
            var x = cell.x;
            var y = cell.y;
            for (var i = -1; i <= 1; i++) {
                x = cell.x + i;
                for (var j = -1; j <= 1; j++) {
                    y = cell.y + j;
                    neighbors.push(__WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(x, y));
                }
            }
            return neighbors;
        }
        function _numOfNeighbors(cell) {
            var amount = 0;
            var x = cell.x;
            var y = cell.y;
            for (var i = -1; i <= 1; i++) {
                x = cell.x + i;
                for (var j = -1; j <= 1; j++) {
                    y = cell.y + j;
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (grid.isAlive(__WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(x, y))) {
                        amount++;
                    }
                    if (amount > 3) {
                        break;
                    }
                }
            }
            return amount;
        }
        var newCells = {};
        var uniquefier = {};
        this._cells.map(function (cell) { return _getNeighbors(cell); })
            .reduce(function (x, y) { return x.concat(y); }, [])
            .filter(function (cell) { return cell.x > -5 && cell.y > -5 && cell.x < _this._cellsX + 5 && cell.y < _this._cellsY + 5; })
            .map(function (cell) { return uniquefier[cell.asKey()] = cell; });
        Object.getOwnPropertyNames(uniquefier)
            .forEach(function (key) {
            var cell = __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].fromKey(key);
            var isAlive = _this.isAlive(cell);
            var numOfNeighbors = _numOfNeighbors(cell);
            var isTwo = numOfNeighbors == 2;
            var isThree = numOfNeighbors == 3;
            var isTwoOrThree = isTwo || isThree;
            if ((isAlive && isTwoOrThree) || (isThree)) {
                newCells[cell.asKey()] = cell;
            }
        });
        this.clear();
        for (var key in newCells) {
            this.revive(__WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].fromKey(key));
        }
        if (callDrawWhenDone) {
            this.draw();
        }
        if (this._isPlaying) {
            window.requestAnimationFrame(function () { return grid.step(); });
        }
    };
    Grid.prototype.start = function () {
        this._isPlaying = true;
        this.step();
    };
    Grid.prototype.stop = function () {
        this._isPlaying = false;
    };
    Grid.prototype.drawCells = function () {
        var _this = this;
        this._cells.forEach(function (cell) {
            _this._ctx.beginPath();
            _this._ctx.rect(cell.x * _this._cellSize, cell.y * _this._cellSize, _this._cellSize, _this._cellSize);
            _this._ctx.fill();
        });
    };
    Grid.prototype.clearRect = function () {
        this._ctx.clearRect(0, 0, this._width, this._height);
        // @hpatel: I made color changes, feel free to revert that. Just thought it looked better? Remove this once you see it
        this._ctx.strokeStyle = "#D7D7D7";
        this._ctx.fillStyle = "#3ACDAB";
    };
    Grid.prototype.drawGrid = function () {
        this._ctx.beginPath();
        for (var x = 0; x <= this._width; x += this._cellSize) {
            this._ctx.moveTo(x, 0);
            this._ctx.lineTo(x, this._height);
        }
        this._ctx.stroke();
        this._ctx.beginPath();
        for (var y = 0; y <= this._height; y += this._cellSize) {
            this._ctx.moveTo(0, y);
            this._ctx.lineTo(this._width, y);
        }
        this._ctx.stroke();
    };
    return Grid;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Patterns; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cell__ = __webpack_require__(0);

var Patterns = /** @class */ (function () {
    function Patterns() {
    }
    Patterns.getGliderGuns = function (cellsX, cellsY) {
        return [
            // Upper Left
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(1, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(1, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(2, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(2, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(11, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(11, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(11, 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(12, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(12, 8),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(13, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(13, 9),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(14, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(14, 9),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(15, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(16, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(16, 8),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(17, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(17, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(17, 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(18, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(21, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(21, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(21, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(22, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(22, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(22, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(23, 2),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(23, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(25, 1),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(25, 2),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(25, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(25, 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(35, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(35, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(36, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(36, 4),
            // Upper Right
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 1, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 1, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 2, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 2, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 11, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 11, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 11, 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 12, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 12, 8),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 13, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 13, 9),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 14, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 14, 9),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 15, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 16, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 16, 8),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 17, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 17, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 17, 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 18, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 21, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 21, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 21, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 22, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 22, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 22, 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 23, 2),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 23, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 25, 1),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 25, 2),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 25, 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 25, 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 35, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 35, 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 36, 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 36, 4),
            // Lower Right
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 1, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 1, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 2, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 2, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 11, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 11, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 11, cellsY - 1 - 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 12, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 12, cellsY - 1 - 8),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 13, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 13, cellsY - 1 - 9),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 14, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 14, cellsY - 1 - 9),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 15, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 16, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 16, cellsY - 1 - 8),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 17, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 17, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 17, cellsY - 1 - 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 18, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 21, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 21, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 21, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 22, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 22, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 22, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 23, cellsY - 1 - 2),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 23, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 25, cellsY - 1 - 1),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 25, cellsY - 1 - 2),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 25, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 25, cellsY - 1 - 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 35, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 35, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 36, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(cellsX - 1 - 36, cellsY - 1 - 4),
            // Lower Left
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(1, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(1, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(2, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(2, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(11, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(11, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(11, cellsY - 1 - 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(12, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(12, cellsY - 1 - 8),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(13, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(13, cellsY - 1 - 9),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(14, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(14, cellsY - 1 - 9),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(15, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(16, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(16, cellsY - 1 - 8),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(17, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(17, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(17, cellsY - 1 - 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(18, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(21, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(21, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(21, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(22, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(22, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(22, cellsY - 1 - 5),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(23, cellsY - 1 - 2),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(23, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(25, cellsY - 1 - 1),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(25, cellsY - 1 - 2),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(25, cellsY - 1 - 6),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(25, cellsY - 1 - 7),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(35, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(35, cellsY - 1 - 4),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(36, cellsY - 1 - 3),
            __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(36, cellsY - 1 - 4),
        ];
    };
    Patterns.hBar = function (cellsX, cellsY) {
        var cells = [];
        for (var i = 1; i <= cellsX; i++) {
            cells.push(__WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* Cell */].of(i, cellsY / 2));
        }
        return cells;
    };
    return Patterns;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTYzZTg0ODg0MGQ1MzJjNGE2OWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NlbGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dyaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhdHRlcm5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtJQUtJLG9DQUFvQztJQUNwQyxjQUFxQixDQUFTLEVBQUUsQ0FBUztRQUNyQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFHTSxZQUFPLEdBQWQsVUFBZ0IsR0FBVztRQUN2QixJQUFJLE1BQU0sR0FBYSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lB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QUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFZCxjQUFjO1lBQ2QsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFM0IsY0FBYztZQUNkLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLG1EQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLGFBQWE7WUFDYixtREFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsbURBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLG1EQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixtREFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsbURBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLG1EQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QixDQUFDO0lBQ04sQ0FBQztJQUdNLGFBQUksR0FBWCxVQUFhLE1BQWMsRUFBRSxNQUFjO1FBQ3ZDLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixHQUFHLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQUMsbURBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNjNlODQ4ODQwZDUzMmM0YTY5ZiIsImV4cG9ydCBjbGFzcyBDZWxsIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuXG5cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCB4OiBudW1iZXIsIHk6IG51bWJlciApIHtcbiAgICAgICAgdGhpcy54ID0gTWF0aC5yb3VuZCh4KTtcbiAgICAgICAgdGhpcy55ID0gTWF0aC5yb3VuZCh5KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tS2V5KCBrZXk6IHN0cmluZyApOiBDZWxsIHtcbiAgICAgICAgbGV0IGNlbGxYWTogc3RyaW5nW10gPSBrZXkuc3BsaXQoXCI6XCIpO1xuICAgICAgICByZXR1cm4gQ2VsbC5vZlN0cihjZWxsWFlbMF0sIGNlbGxYWVsxXSk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgb2ZTdHIoIHg6IHN0cmluZywgeTogc3RyaW5nICkge1xuICAgICAgICByZXR1cm4gbmV3IENlbGwocGFyc2VJbnQoeCksIHBhcnNlSW50KHkpKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBvZiggeDogbnVtYmVyLCB5OiBudW1iZXIgKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2VsbCh4LCB5KTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBhc0tleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy54fToke3RoaXMueX1gO1xuICAgIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NlbGwudHMiLCIvKlxuICogTWFrZSBBTEwganMgcmVsYXRlZCBjaGFuZ2VzIGluIGEgLnRzIGZpbGUsIGl0IGdpdmVzIGV4dHJhIGZlYXR1cmVzIGFuZCBpcyBjb21waWxlZCBkb3duIHRvIGEgLmpzIGZpbGUuIFRoZSAuanMgZmlsZXMgKkFSRSBHRU5FUkFURUQqIFNvXG4gKiBkb24ndCBtb2RpZnkgdGhlIC5qcyBmaWxlcywgYXMgeW91ciBjaGFuZ2VzICpXSUxMIEJFIExPU1QqIDpQXG4gKlxuICogTGV0IG1lIGtub3cgaWYgeW91IGhhdmUgQU5ZIHF1ZXN0aW9ucyBvciB3b3VsZCByYXRoZXIgZG8gc29tZXRoaW5nIGVsc2UhIDopXG4gKi9cblxuXG5pbXBvcnQgeyBHcmlkIH0gZnJvbSBcIi4vR3JpZFwiO1xuaW1wb3J0IHsgUGF0dGVybnMgfSBmcm9tIFwiLi9QYXR0ZXJuc1wiO1xuaW1wb3J0IHsgQ2VsbCB9IGZyb20gXCIuL0NlbGxcIjtcblxuY29uc3QgTUFYX1NJWkUgID0gMjAwMDtcbmNvbnN0IENFTExfU0laRSA9IDEwO1xuY29uc3QgTUFYX0NFTExTID0gTUFYX1NJWkUgLyBDRUxMX1NJWkU7XG5cbmxldCBXOiBudW1iZXIsIEg6IG51bWJlcjtcbmxldCBDRUxMU19YOiBudW1iZXIsIENFTExTX1k6IG51bWJlcjtcbmNvbnN0IGdyaWQ6IEdyaWQgPSBuZXcgR3JpZChNQVhfQ0VMTFMsIENFTExfU0laRSk7XG5cblxuZnVuY3Rpb24gcmVmcmVzaFNpemUoKSB7XG4gICAgbGV0IGRvY0JvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIFcgICAgICAgICAgID0gTWF0aC5taW4oZG9jQm9keS5jbGllbnRXaWR0aCwgTUFYX1NJWkUpO1xuICAgIEggICAgICAgICAgID0gTWF0aC5taW4oZG9jQm9keS5jbGllbnRIZWlnaHQsIE1BWF9TSVpFKTtcblxuICAgIGdyaWQuc2V0U2l6ZShXLCBIKTtcblxuICAgIENFTExTX1ggPSBNYXRoLnJvdW5kKFcgLyBDRUxMX1NJWkUpO1xuICAgIENFTExTX1kgPSBNYXRoLnJvdW5kKEggLyBDRUxMX1NJWkUpO1xufVxuXG5cbndpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHtcbiAgICByZWZyZXNoU2l6ZSgpO1xuICAgIGdyaWQuZHJhdygpO1xufTtcblxuXG5mdW5jdGlvbiBnYW1lU3RhcnQoKSB7XG4gICAgZ3JpZC5zdGFydCgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheS1pY29uXCIpLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBudWxsKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BhdXNlLWljb25cIikucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuICAgIGNvbnN0IHBsYXlQYXVzZUxhYmVsOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheVBhdXNlTGFiZWxcIik7XG4gICAgcGxheVBhdXNlTGFiZWwuaW5uZXJUZXh0ICAgICAgICAgID0gXCJQYXVzZVwiO1xufVxuXG5cbmZ1bmN0aW9uIGdhbWVTdG9wKCkge1xuICAgIGdyaWQuc3RvcCgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGF1c2UtaWNvblwiKS5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgbnVsbCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5LWljb25cIikucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuICAgIGNvbnN0IHBsYXlQYXVzZUxhYmVsOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheVBhdXNlTGFiZWxcIik7XG4gICAgcGxheVBhdXNlTGFiZWwuaW5uZXJUZXh0ICAgICAgICAgID0gXCJQbGF5XCI7XG59XG5cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICB3aW5kb3cucmVzaXplVG8oNzY2LCA1MDIpO1xuXG4gICAgZ3JpZC5zZXRDYW52YXMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKSk7XG5cbiAgICBncmlkLmNhbnZhcy5vbmNsaWNrICAgICAgICAgICAgICAgICAgICAgICAgICA9ICggZSApID0+IHtcbiAgICAgICAgLy9tb3VzZWNsaWNrIHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IG14ID0gZS5vZmZzZXRYO1xuICAgICAgICBjb25zdCBteSA9IGUub2Zmc2V0WTtcblxuICAgICAgICAvL2NhbGN1bGF0ZSBncmlkIHNxdWFyZSBudW1iZXJzIHJvdW5kZWQgdG8gdGhlIG5lYXJlc3QgdGVuXG4gICAgICAgIGNvbnN0IGd4ID0gTWF0aC5mbG9vcihteCAvIENFTExfU0laRSk7IC8vKjEwO1xuICAgICAgICBjb25zdCBneSA9IE1hdGguZmxvb3IobXkgLyBDRUxMX1NJWkUpOyAvLyoxMDtcblxuICAgICAgICBjb25zdCBjZWxsID0gQ2VsbC5vZihneCwgZ3kpO1xuXG4gICAgICAgIC8vaWYgcHJlc3MgYW4gYWxpdmUgY2VsbCwga2lsbCBpdFxuICAgICAgICBpZiAoIGdyaWQuaXNBbGl2ZShjZWxsKSApIHtcbiAgICAgICAgICAgIGdyaWQua2lsbChjZWxsKTtcbiAgICAgICAgICAgIGdyaWQuZHJhdygpO1xuICAgICAgICB9XG4gICAgICAgIC8vZWxzZSByZXZpdmUgb3IgYnJpbmcgdG8gbGlmZVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdyaWQucmV2aXZlKGNlbGwpO1xuICAgICAgICAgICAgZ3JpZC5kcmF3KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXRCdG5cIikub25jbGljayAgPSAoKSA9PiB7XG4gICAgICAgIGdhbWVTdG9wKCk7XG4gICAgICAgIGluaXRDZWxscygpO1xuICAgICAgICBncmlkLmRyYXcoKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RlcDIzQnRuXCIpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGdhbWVTdG9wKCk7XG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IDIzOyBpKysgKSB7XG4gICAgICAgICAgICBncmlkLnN0ZXAoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGdyaWQuZHJhdygpO1xuICAgIH07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGVwQnRuXCIpLm9uY2xpY2sgICA9ICgpID0+IHtcbiAgICAgICAgZ2FtZVN0b3AoKTtcbiAgICAgICAgZ3JpZC5zdGVwKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyQnRuXCIpLm9uY2xpY2sgID0gKCkgPT4ge1xuICAgICAgICBncmlkLmNsZWFyKCk7XG4gICAgICAgIGdyaWQuZHJhdygpO1xuICAgICAgICBnYW1lU3RvcCgpO1xuICAgIH07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5UGF1c2VcIikub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKCBncmlkLmlzUGxheWluZyApIHtcbiAgICAgICAgICAgIGdhbWVTdG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lU3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZWZyZXNoU2l6ZSgpO1xuICAgIGluaXRDZWxscygpO1xuICAgIGdyaWQuZHJhdygpO1xuICAgIGdhbWVTdG9wKCk7XG59O1xuXG5cbmZ1bmN0aW9uIGluaXRDZWxscygpIHtcbiAgICBncmlkLmNsZWFyKCk7XG5cbiAgICBQYXR0ZXJucy5nZXRHbGlkZXJHdW5zKENFTExTX1gsIENFTExTX1kpLmZvckVhY2goY2VsbCA9PiBncmlkLnJldml2ZShjZWxsKSk7XG5cbiAgICAvLyBQYXR0ZXJucy5oQmFyKENFTExTX1gsIENFTExTX1kpLmZvckVhY2goY2VsbCA9PiBncmlkLnJldml2ZShjZWxsKSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4udHMiLCIvKipcbiAqIENyZWF0ZWQgYnkgam9zaHVha2luZyBvbiAxMS83LzE3LlxuICovXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSBcIi4vQ2VsbFwiO1xuXG5leHBvcnQgY2xhc3MgR3JpZCB7XG4gICAgcHJpdmF0ZSBfY2VsbFNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9tYXhDZWxsczogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NlbGxzWDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NlbGxzWTogbnVtYmVyO1xuICAgIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG5cblxuICAgIGNvbnN0cnVjdG9yKCBtYXhDZWxsczogbnVtYmVyLCBjZWxsU2l6ZTogbnVtYmVyICkge1xuICAgICAgICB0aGlzLl9tYXhDZWxscyA9IG1heENlbGxzO1xuICAgICAgICB0aGlzLl9jZWxsU2l6ZSA9IGNlbGxTaXplO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfaXNQbGF5aW5nOiBib29sZWFuO1xuXG5cbiAgICBnZXQgaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cblxuICAgIGdldCBjdHgoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N0eDtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cblxuICAgIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfY2VsbHM6IENlbGxbXSA9IFtdO1xuXG5cbiAgICBnZXQgY2VsbHMoKTogQ2VsbFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxzO1xuICAgIH1cblxuXG4gICAgcHVibGljIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmNlbGxzLmZvckVhY2goY2VsbCA9PiB0aGlzLmtpbGwoY2VsbCkpO1xuICAgIH1cblxuXG4gICAgcHVibGljIHJldml2ZSggY2VsbDogQ2VsbCApIHtcbiAgICAgICAgdGhpcy5jZWxscy5wdXNoKGNlbGwpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGtpbGwoIGNlbGw6IENlbGwgKSB7XG4gICAgICAgIHRoaXMuX2NlbGxzLnNwbGljZSh0aGlzLl9jZWxscy5pbmRleE9mKGNlbGwpKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZXRDYW52YXMoIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY3R4ICAgID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZXRTaXplKCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciApIHtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLl9jZWxsc1ggPSBNYXRoLnJvdW5kKHRoaXMuX3dpZHRoIC8gdGhpcy5fY2VsbFNpemUpO1xuICAgICAgICB0aGlzLl9jZWxsc1kgPSBNYXRoLnJvdW5kKHRoaXMuX2hlaWdodCAvIHRoaXMuX2NlbGxTaXplKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBkcmF3KCkge1xuICAgICAgICB0aGlzLmNsZWFyUmVjdCgpO1xuICAgICAgICB0aGlzLmRyYXdHcmlkKCk7XG4gICAgICAgIHRoaXMuZHJhd0NlbGxzKCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgaXNBbGl2ZSggY2VsbDogQ2VsbCApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxzLmZpbHRlcihjID0+IGMuYXNLZXkoKSA9PSBjZWxsLmFzS2V5KCkpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RlcCggY2FsbERyYXdXaGVuRG9uZSA9IHRydWUgKSB7XG5cblxuICAgICAgICBsZXQgZ3JpZCA9IHRoaXM7XG5cblxuICAgICAgICBmdW5jdGlvbiBfZ2V0TmVpZ2hib3JzKCBjZWxsOiBDZWxsICkge1xuICAgICAgICAgICAgbGV0IG5laWdoYm9yczogQ2VsbFtdID0gW107XG4gICAgICAgICAgICBsZXQgeCAgICAgICAgICAgICAgICAgPSBjZWxsLng7XG4gICAgICAgICAgICBsZXQgeSAgICAgICAgICAgICAgICAgPSBjZWxsLnk7XG5cbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gLTE7IGkgPD0gMTsgaSsrICkge1xuICAgICAgICAgICAgICAgIHggPSBjZWxsLnggKyBpO1xuICAgICAgICAgICAgICAgIGZvciAoIGxldCBqID0gLTE7IGogPD0gMTsgaisrICkge1xuICAgICAgICAgICAgICAgICAgICB5ID0gY2VsbC55ICsgajtcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goQ2VsbC5vZih4LCB5KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmVpZ2hib3JzO1xuICAgICAgICB9XG5cblxuICAgICAgICBmdW5jdGlvbiBfbnVtT2ZOZWlnaGJvcnMoIGNlbGw6IENlbGwgKSB7XG4gICAgICAgICAgICBsZXQgYW1vdW50ID0gMDtcbiAgICAgICAgICAgIGxldCB4ICAgICAgPSBjZWxsLng7XG4gICAgICAgICAgICBsZXQgeSAgICAgID0gY2VsbC55O1xuXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IC0xOyBpIDw9IDE7IGkrKyApIHtcbiAgICAgICAgICAgICAgICB4ID0gY2VsbC54ICsgaTtcbiAgICAgICAgICAgICAgICBmb3IgKCBsZXQgaiA9IC0xOyBqIDw9IDE7IGorKyApIHtcbiAgICAgICAgICAgICAgICAgICAgeSA9IGNlbGwueSArIGo7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpID09PSAwICYmIGogPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICggZ3JpZC5pc0FsaXZlKENlbGwub2YoeCwgeSkpICkgeyBhbW91bnQrKzsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIGFtb3VudCA+IDMgKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYW1vdW50O1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgbmV3Q2VsbHM6IHsgW2tleTogc3RyaW5nXTogQ2VsbCB9ICAgPSB7fTtcbiAgICAgICAgbGV0IHVuaXF1ZWZpZXI6IHsgW2tleTogc3RyaW5nXTogQ2VsbCB9ID0ge307XG5cbiAgICAgICAgdGhpcy5fY2VsbHMubWFwKGNlbGwgPT4gX2dldE5laWdoYm9ycyhjZWxsKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKCB4LCB5ICkgPT4geC5jb25jYXQoeSksIFtdKVxuICAgICAgICAgICAgLmZpbHRlcihjZWxsID0+IGNlbGwueCA+IC01ICYmIGNlbGwueSA+IC01ICYmIGNlbGwueCA8IHRoaXMuX2NlbGxzWCArIDUgJiYgY2VsbC55IDwgdGhpcy5fY2VsbHNZICsgNSlcbiAgICAgICAgICAgIC5tYXAoY2VsbCA9PiB1bmlxdWVmaWVyW2NlbGwuYXNLZXkoKV0gPSBjZWxsKTtcblxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh1bmlxdWVmaWVyKVxuICAgICAgICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBDZWxsLmZyb21LZXkoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgbGV0IGlzQWxpdmUgICAgICAgID0gdGhpcy5pc0FsaXZlKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgbGV0IG51bU9mTmVpZ2hib3JzID0gX251bU9mTmVpZ2hib3JzKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgbGV0IGlzVHdvICAgICAgICAgID0gbnVtT2ZOZWlnaGJvcnMgPT0gMjtcbiAgICAgICAgICAgICAgICAgIGxldCBpc1RocmVlICAgICAgICA9IG51bU9mTmVpZ2hib3JzID09IDM7XG4gICAgICAgICAgICAgICAgICBsZXQgaXNUd29PclRocmVlICAgPSBpc1R3byB8fCBpc1RocmVlO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWxpdmUgJiYgaXNUd29PclRocmVlXG4gICAgICAgICAgICAgICAgICAgICAgICkgfHwgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUaHJlZVxuICAgICAgICAgICAgICAgICAgICAgICApICkge1xuICAgICAgICAgICAgICAgICAgICAgIG5ld0NlbGxzW2NlbGwuYXNLZXkoKV0gPSBjZWxsO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGZvciAoIGNvbnN0IGtleSBpbiBuZXdDZWxscyApIHtcbiAgICAgICAgICAgIHRoaXMucmV2aXZlKENlbGwuZnJvbUtleShrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIGNhbGxEcmF3V2hlbkRvbmUgKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5faXNQbGF5aW5nICkge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBncmlkLnN0ZXAoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGVwKCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGRyYXdDZWxscygpIHtcbiAgICAgICAgdGhpcy5fY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5yZWN0KGNlbGwueCAqIHRoaXMuX2NlbGxTaXplLCBjZWxsLnkgKiB0aGlzLl9jZWxsU2l6ZSwgdGhpcy5fY2VsbFNpemUsIHRoaXMuX2NlbGxTaXplKTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjbGVhclJlY3QoKSB7XG4gICAgICAgIHRoaXMuX2N0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG5cbiAgICAgICAgLy8gQGhwYXRlbDogSSBtYWRlIGNvbG9yIGNoYW5nZXMsIGZlZWwgZnJlZSB0byByZXZlcnQgdGhhdC4gSnVzdCB0aG91Z2h0IGl0IGxvb2tlZCBiZXR0ZXI/IFJlbW92ZSB0aGlzIG9uY2UgeW91IHNlZSBpdFxuICAgICAgICB0aGlzLl9jdHguc3Ryb2tlU3R5bGUgPSBcIiNEN0Q3RDdcIjtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSAgID0gXCIjM0FDREFCXCI7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGRyYXdHcmlkKCkge1xuICAgICAgICB0aGlzLl9jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGZvciAoIGxldCB4ID0gMDsgeCA8PSB0aGlzLl93aWR0aDsgeCArPSB0aGlzLl9jZWxsU2l6ZSApIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5tb3ZlVG8oeCwgMCk7XG4gICAgICAgICAgICB0aGlzLl9jdHgubGluZVRvKHgsIHRoaXMuX2hlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIHRoaXMuX2N0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgZm9yICggbGV0IHkgPSAwOyB5IDw9IHRoaXMuX2hlaWdodDsgeSArPSB0aGlzLl9jZWxsU2l6ZSApIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5tb3ZlVG8oMCwgeSk7XG4gICAgICAgICAgICB0aGlzLl9jdHgubGluZVRvKHRoaXMuX3dpZHRoLCB5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdHguc3Ryb2tlKCk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9HcmlkLnRzIiwiaW1wb3J0IHsgQ2VsbCB9IGZyb20gXCIuL0NlbGxcIjtcblxuZXhwb3J0IGNsYXNzIFBhdHRlcm5zIHtcbiAgICBwdWJsaWMgc3RhdGljIGdldEdsaWRlckd1bnMoIGNlbGxzWDogbnVtYmVyLCBjZWxsc1k6IG51bWJlciApIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC8vIFVwcGVyIExlZnRcbiAgICAgICAgICAgIENlbGwub2YoMSwgNSksXG4gICAgICAgICAgICBDZWxsLm9mKDEsIDYpLFxuICAgICAgICAgICAgQ2VsbC5vZigyLCA1KSxcbiAgICAgICAgICAgIENlbGwub2YoMiwgNiksXG4gICAgICAgICAgICBDZWxsLm9mKDExLCA1KSxcbiAgICAgICAgICAgIENlbGwub2YoMTEsIDYpLFxuICAgICAgICAgICAgQ2VsbC5vZigxMSwgNyksXG4gICAgICAgICAgICBDZWxsLm9mKDEyLCA0KSxcbiAgICAgICAgICAgIENlbGwub2YoMTIsIDgpLFxuICAgICAgICAgICAgQ2VsbC5vZigxMywgMyksXG4gICAgICAgICAgICBDZWxsLm9mKDEzLCA5KSxcbiAgICAgICAgICAgIENlbGwub2YoMTQsIDMpLFxuICAgICAgICAgICAgQ2VsbC5vZigxNCwgOSksXG4gICAgICAgICAgICBDZWxsLm9mKDE1LCA2KSxcbiAgICAgICAgICAgIENlbGwub2YoMTYsIDQpLFxuICAgICAgICAgICAgQ2VsbC5vZigxNiwgOCksXG4gICAgICAgICAgICBDZWxsLm9mKDE3LCA1KSxcbiAgICAgICAgICAgIENlbGwub2YoMTcsIDYpLFxuICAgICAgICAgICAgQ2VsbC5vZigxNywgNyksXG4gICAgICAgICAgICBDZWxsLm9mKDE4LCA2KSxcbiAgICAgICAgICAgIENlbGwub2YoMjEsIDMpLFxuICAgICAgICAgICAgQ2VsbC5vZigyMSwgNCksXG4gICAgICAgICAgICBDZWxsLm9mKDIxLCA1KSxcbiAgICAgICAgICAgIENlbGwub2YoMjIsIDMpLFxuICAgICAgICAgICAgQ2VsbC5vZigyMiwgNCksXG4gICAgICAgICAgICBDZWxsLm9mKDIyLCA1KSxcbiAgICAgICAgICAgIENlbGwub2YoMjMsIDIpLFxuICAgICAgICAgICAgQ2VsbC5vZigyMywgNiksXG4gICAgICAgICAgICBDZWxsLm9mKDI1LCAxKSxcbiAgICAgICAgICAgIENlbGwub2YoMjUsIDIpLFxuICAgICAgICAgICAgQ2VsbC5vZigyNSwgNiksXG4gICAgICAgICAgICBDZWxsLm9mKDI1LCA3KSxcbiAgICAgICAgICAgIENlbGwub2YoMzUsIDMpLFxuICAgICAgICAgICAgQ2VsbC5vZigzNSwgNCksXG4gICAgICAgICAgICBDZWxsLm9mKDM2LCAzKSxcbiAgICAgICAgICAgIENlbGwub2YoMzYsIDQpLFxuXG4gICAgICAgICAgICAvLyBVcHBlciBSaWdodFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMSwgNSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxLCA2KSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDIsIDUpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMiwgNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMSwgNSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMSwgNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMSwgNyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMiwgNCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMiwgOCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMywgMyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMywgOSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNCwgMyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNCwgOSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNSwgNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNiwgNCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNiwgOCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNywgNSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNywgNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNywgNyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxOCwgNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMSwgMyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMSwgNCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMSwgNSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMiwgMyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMiwgNCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMiwgNSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMywgMiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMywgNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyNSwgMSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyNSwgMiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyNSwgNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyNSwgNyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAzNSwgMyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAzNSwgNCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAzNiwgMyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAzNiwgNCksXG5cbiAgICAgICAgICAgIC8vIExvd2VyIFJpZ2h0XG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxLCBjZWxsc1kgLSAxIC0gNSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxLCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyLCBjZWxsc1kgLSAxIC0gNSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyLCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMSwgY2VsbHNZIC0gMSAtIDUpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMTEsIGNlbGxzWSAtIDEgLSA2KSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDExLCBjZWxsc1kgLSAxIC0gNyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMiwgY2VsbHNZIC0gMSAtIDQpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMTIsIGNlbGxzWSAtIDEgLSA4KSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDEzLCBjZWxsc1kgLSAxIC0gMyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxMywgY2VsbHNZIC0gMSAtIDkpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMTQsIGNlbGxzWSAtIDEgLSAzKSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDE0LCBjZWxsc1kgLSAxIC0gOSksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNSwgY2VsbHNZIC0gMSAtIDYpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMTYsIGNlbGxzWSAtIDEgLSA0KSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDE2LCBjZWxsc1kgLSAxIC0gOCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxNywgY2VsbHNZIC0gMSAtIDUpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMTcsIGNlbGxzWSAtIDEgLSA2KSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDE3LCBjZWxsc1kgLSAxIC0gNyksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAxOCwgY2VsbHNZIC0gMSAtIDYpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMjEsIGNlbGxzWSAtIDEgLSAzKSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDIxLCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMSwgY2VsbHNZIC0gMSAtIDUpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMjIsIGNlbGxzWSAtIDEgLSAzKSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDIyLCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyMiwgY2VsbHNZIC0gMSAtIDUpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMjMsIGNlbGxzWSAtIDEgLSAyKSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDIzLCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyNSwgY2VsbHNZIC0gMSAtIDEpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMjUsIGNlbGxzWSAtIDEgLSAyKSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDI1LCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAyNSwgY2VsbHNZIC0gMSAtIDcpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMzUsIGNlbGxzWSAtIDEgLSAzKSxcbiAgICAgICAgICAgIENlbGwub2YoY2VsbHNYIC0gMSAtIDM1LCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgICAgICBDZWxsLm9mKGNlbGxzWCAtIDEgLSAzNiwgY2VsbHNZIC0gMSAtIDMpLFxuICAgICAgICAgICAgQ2VsbC5vZihjZWxsc1ggLSAxIC0gMzYsIGNlbGxzWSAtIDEgLSA0KSxcblxuICAgICAgICAgICAgLy8gTG93ZXIgTGVmdFxuICAgICAgICAgICAgQ2VsbC5vZigxLCBjZWxsc1kgLSAxIC0gNSksXG4gICAgICAgICAgICBDZWxsLm9mKDEsIGNlbGxzWSAtIDEgLSA2KSxcbiAgICAgICAgICAgIENlbGwub2YoMiwgY2VsbHNZIC0gMSAtIDUpLFxuICAgICAgICAgICAgQ2VsbC5vZigyLCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKDExLCBjZWxsc1kgLSAxIC0gNSksXG4gICAgICAgICAgICBDZWxsLm9mKDExLCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKDExLCBjZWxsc1kgLSAxIC0gNyksXG4gICAgICAgICAgICBDZWxsLm9mKDEyLCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgICAgICBDZWxsLm9mKDEyLCBjZWxsc1kgLSAxIC0gOCksXG4gICAgICAgICAgICBDZWxsLm9mKDEzLCBjZWxsc1kgLSAxIC0gMyksXG4gICAgICAgICAgICBDZWxsLm9mKDEzLCBjZWxsc1kgLSAxIC0gOSksXG4gICAgICAgICAgICBDZWxsLm9mKDE0LCBjZWxsc1kgLSAxIC0gMyksXG4gICAgICAgICAgICBDZWxsLm9mKDE0LCBjZWxsc1kgLSAxIC0gOSksXG4gICAgICAgICAgICBDZWxsLm9mKDE1LCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKDE2LCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgICAgICBDZWxsLm9mKDE2LCBjZWxsc1kgLSAxIC0gOCksXG4gICAgICAgICAgICBDZWxsLm9mKDE3LCBjZWxsc1kgLSAxIC0gNSksXG4gICAgICAgICAgICBDZWxsLm9mKDE3LCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKDE3LCBjZWxsc1kgLSAxIC0gNyksXG4gICAgICAgICAgICBDZWxsLm9mKDE4LCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKDIxLCBjZWxsc1kgLSAxIC0gMyksXG4gICAgICAgICAgICBDZWxsLm9mKDIxLCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgICAgICBDZWxsLm9mKDIxLCBjZWxsc1kgLSAxIC0gNSksXG4gICAgICAgICAgICBDZWxsLm9mKDIyLCBjZWxsc1kgLSAxIC0gMyksXG4gICAgICAgICAgICBDZWxsLm9mKDIyLCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgICAgICBDZWxsLm9mKDIyLCBjZWxsc1kgLSAxIC0gNSksXG4gICAgICAgICAgICBDZWxsLm9mKDIzLCBjZWxsc1kgLSAxIC0gMiksXG4gICAgICAgICAgICBDZWxsLm9mKDIzLCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKDI1LCBjZWxsc1kgLSAxIC0gMSksXG4gICAgICAgICAgICBDZWxsLm9mKDI1LCBjZWxsc1kgLSAxIC0gMiksXG4gICAgICAgICAgICBDZWxsLm9mKDI1LCBjZWxsc1kgLSAxIC0gNiksXG4gICAgICAgICAgICBDZWxsLm9mKDI1LCBjZWxsc1kgLSAxIC0gNyksXG4gICAgICAgICAgICBDZWxsLm9mKDM1LCBjZWxsc1kgLSAxIC0gMyksXG4gICAgICAgICAgICBDZWxsLm9mKDM1LCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgICAgICBDZWxsLm9mKDM2LCBjZWxsc1kgLSAxIC0gMyksXG4gICAgICAgICAgICBDZWxsLm9mKDM2LCBjZWxsc1kgLSAxIC0gNCksXG4gICAgICAgIF07XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaEJhciggY2VsbHNYOiBudW1iZXIsIGNlbGxzWTogbnVtYmVyICkge1xuICAgICAgICBjb25zdCBjZWxscyA9IFtdO1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDE7IGkgPD0gY2VsbHNYOyBpKysgKSB7XG4gICAgICAgICAgICBjZWxscy5wdXNoKENlbGwub2YoaSwgY2VsbHNZIC8gMikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxscztcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BhdHRlcm5zLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==