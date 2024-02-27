

class ocrImg {
    constructor(_canvas, _ocrOutput = "ocrOutput") {
        this.canvas = _canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ocrOutput = document.getElementById(_ocrOutput);
    }

    read() {
        const { canvas, ctx, ocrOutput } = this;
        const dataUrl = canvas.toDataURL();

        async function getTextFromImage() {
            const worker = await Tesseract.createWorker('eng');
            const ret = await worker.recognize(dataUrl);
            const text = ret.data.text;
            await worker.terminate();
            return text;
        }

        getTextFromImage().then(info => { console.log(info); ocrOutput.style.display = info ? "block" : "none"; ocrOutput.value = info ? info : ""; }).catch(error => { ocrOutput.innerText = error; });
    }
}

export { ocrImg };