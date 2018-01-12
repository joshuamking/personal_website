/*
 * Make ALL js related changes in a .ts file, it gives extra features and is compiled down to a .js file. The .js files *ARE GENERATED* So
 * don't modify the .js files, as your changes *WILL BE LOST* :P
 *
 * Let me know if you have ANY questions or would rather do something else! :)
 */
import { Grid } from "./Grid";
import { Patterns } from "./Patterns";
import { Cell } from "./Cell";
var MAX_SIZE = 2000;
var CELL_SIZE = 10;
var MAX_CELLS = MAX_SIZE / CELL_SIZE;
var W, H;
var CELLS_X, CELLS_Y;
var grid = new Grid(MAX_CELLS, CELL_SIZE);
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
        var cell = Cell.of(gx, gy);
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
    Patterns.getGliderGuns(CELLS_X, CELLS_Y).forEach(function (cell) { return grid.revive(cell); });
    // Patterns.hBar(CELLS_X, CELLS_Y).forEach(cell => grid.revive(cell));
}
//# sourceMappingURL=main.js.map