import { Uuid } from "../utils/uuidCreator.js";
import { camSign } from "../utils/camSign.js";
import { imgSign } from "../utils/imgSign.js";

class Autographing {
    constructor(_canvasName) {
        this.canvasName = _canvasName;
    }

    save(buttonName) {
        const canvas = document.getElementById(this.canvasName);
        canvas.width = 400;
        canvas.height = 200;

        const button = document.getElementById(buttonName);
        button.addEventListener('mousedown', () => {
            const nameField = document.getElementById("autoGraphName");
            const uuid = new Uuid();
            const id = uuid.id().then(id => {
                alert(id);
                const name = nameField ? nameField.value : "";
                const dataUrl = canvas.toDataURL();
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${name}_${id}_myAutoGraph.jpg`;
                link.click();
            }).catch(e => { alert(e) });
        })
    };

    fotoSign(option) {
        const canvas = document.getElementById(this.canvasName);
        canvas.width = 400;
        canvas.height = 200;

        let toggleScan = true;

        //imageselect
        const img = () => { const myImg = new imgSign("autoGraphImg", this.canvasName); myImg.load(); };

        //camera select
        const cam = () => {
            const scanButton = document.getElementById("scan");
            const myCam = new camSign(this.canvasName);

            scanButton.addEventListener('mousedown', () => {
                scanButton.innerText = toggleScan ? "stop scanning" : "scan image";
                toggleScan ? (myCam.play = true) : (myCam.play = false);
                myCam.start();
                toggleScan = !toggleScan;
            });
        }

        option == "imgSign" && img();
        option == "camSign" && cam();
    }

    sign() {
        const canvas = document.getElementById(this.canvasName);
        const ctx = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 200;

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

export { Autographing };