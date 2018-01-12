var W, H;
window.onresize = function () {
    W = document.body.clientWidth;
    H = document.body.clientHeight;
};
window.onload = function () {
    console.log(W);
    console.log(H);
    var canvas;
    var ctx;
    canvas.width = W;
    canvas.height = H;
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
};
