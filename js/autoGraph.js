import { Uuid } from "./uuidCreator";

class Autographing {
    constructor(canvasName) {
        const canvas = document.getElementById(canvasName);

        const ctx = canvas.getContext("2d");

        canvas.width = 400;
        canvas.height = 200;

        this.save = function (buttonName) {
            const button = document.getElementById(buttonName);
            button.addEventListener('mousedown', () => {
                const nameField = document.getElementById("autoGraphName");
                const uuid = new Uuid();
                console.log(uuid);
                const name = nameField ? nameField.value : "";
                const dataUrl = canvas.toDataURL();
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${name}_myAutoGraph.jpg`;
                link.click();
            })
        };

        this.sign = function () {
            let draw, clear, lastX = 0, lastY = 0;
            canvas.addEventListener('mousedown', (info) => { draw = true;[lastX, lastY] = [info.offsetX, info.offsetY]; });
            canvas.addEventListener('mouseup', () => { draw = false });
            canvas.addEventListener('mouseleave', () => { draw = false });
            canvas.addEventListener('dblclick', () => { clear = true });

            canvas.addEventListener('mousemove', function (info) {
                //getting current info of the canvas-position
                const width = canvas.width;
                const height = canvas.height;
                const x = info.offsetX;
                const y = info.offsetY;

                clear && (ctx.clearRect(0, 0, width, height), clear = false)

                // start drawing
                if (draw) {
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = 'black';
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }

                [lastX, lastY] = [x, y]
            });
        };
    }
}

export { Autographing };