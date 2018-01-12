let W, H;

window.onresize = () => {
    W = document.body.clientWidth;
    H = document.body.clientHeight;
};


window.onload = () => {
    console.log(W);
    console.log(H);


    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    canvas.width  = W;
    canvas.height = H;

    canvas = document.querySelector("canvas");
    ctx    = canvas.getContext("2d");
};