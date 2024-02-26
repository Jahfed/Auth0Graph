import { ocrImg } from "./ocr.js";

class imgSign {
    constructor(_fileInputName = "autoGraphImg", _canvasName = "autoGraph", _readName = "readImg") {
        this.fileInput = document.getElementById(_fileInputName);
        this.canvas = document.getElementById(_canvasName);
        this.ctx = this.canvas.getContext("2d");
        this.readButton = document.getElementById(_readName);
    }

    load() {
        const { fileInput, canvas, ctx } = this;
        const canvasRatio = canvas.width / canvas.height;

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            const image = new Image();
            image.src = URL.createObjectURL(e.target.files[0]);

            image.onload = () => {
                const imgWidth = image.width;
                const imgHeight = image.height;
                const imgRatio = imgWidth / imgHeight;

                const drawWidth = imgRatio > canvasRatio ? canvas.width : canvas.height * imgRatio;
                const drawHeight = imgRatio > canvasRatio ? canvas.width / imgRatio : canvas.height;
                const drawX = (canvas.width - drawWidth) / 2,
                    drawY = (canvas.height - drawHeight) / 2;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
            }
        })

        canvas.addEventListener('dblclick', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        })

        this.readButton.addEventListener('onclick', () => {
            const myRead = new ocrImg;
            myRead.read();
        })

    }
}

export { imgSign };