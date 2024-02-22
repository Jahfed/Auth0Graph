class Autographing {
    constructor(canvasName) {
        const canvas = document.getElementById(canvasName);
        const ctx = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 200;

        this.sign = function () {
            console.log("my function");
            canvas.addEventListener('mousemove', function (info) {
                //getting current info of the canvas-position
                const width = canvas.width;
                const height = canvas.height;
                const x = info.offsetX;
                const y = info.offsetY;

                //lets clear the canvas and start drawing!
                ctx.clearRect(0, 0, width, height);
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.stroke();
            });
        };
    }
}

export { Autographing };