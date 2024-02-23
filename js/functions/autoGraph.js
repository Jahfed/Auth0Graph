import { Uuid } from "../utils/uuidCreator.js";
import { camSign } from "../utils/camSign.js";

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
                const id = uuid.id();
                const name = nameField ? nameField.value : "";
                const dataUrl = canvas.toDataURL();
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${name}_${id}_myAutoGraph.jpg`;
                link.click();
            })
        };

        this.fotoSign = function (option) {
            let toggleScan = true;
            option == "albumSign" && album();
            option == "camSign";

            const scanButton = document.getElementById("scan");
            scanButton.addEventListener('mousedown', () => {
                scanButton.innerText = toggleScan ? "stop scanning" : "scan image";
                toggleScan ? cam() : cam(false);
                toggleScan = !toggleScan;
            });
            function cam(play = true) {
                if (play) { console.log("camera started, start scanning..."); const myCam = new camSign(canvasName); myCam.start(); }
                else { console.log("stop camera"); }
            }
            function album() { console.log("album") };
        }

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