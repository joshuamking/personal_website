/**
 * Created by joshuaking on 11/7/17.
 */
import { Cell } from "./Cell";
var Grid = (function () {
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
                    neighbors.push(Cell.of(x, y));
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
                    if (grid.isAlive(Cell.of(x, y))) {
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
            var cell = Cell.fromKey(key);
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
            this.revive(Cell.fromKey(key));
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
export { Grid };
//# sourceMappingURL=Grid.js.map