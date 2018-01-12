var Cell = (function () {
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
export { Cell };
//# sourceMappingURL=Cell.js.map