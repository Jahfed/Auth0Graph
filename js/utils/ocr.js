import tesseract from "node-tesseract-ocr";

class ocrImg {
    constructor(_canvasName) {
        this.canvas = document.getElementById(_canvasName);
        this.ctx = this.canvas.getContext('2d');
    }

    read() {
        const { canvas, ctx } = this;
        const dataUrl = canvas.toDataURL();

        const config = {
            lang: "eng",
            oem: 1,
            psm: 3,
        }

        tesseract.recognize(dataUrl, config).then((text) => {
            console.log("Result:", text)
        }).catch((error) => {
            console.log(error.message)
        })
    }
}

export { ocrImg };