class camSign {
    constructor(_canvasName) {
        this.canvas = document.getElementById(_canvasName);
        this.ctx = this.canvas.getContext("2d");
        this.play = true;
    }

    start() {
        const play = this.play;
        const canvas = this.canvas;
        const ctx = this.ctx;
        let video = null;
        let stream = null;

        if (this.play) {
            //Check if person wants to play or not
            const getCam = navigator.mediaDevices.getUserMedia({ video: true });

            getCam.then((signal) => {
                video = document.createElement("video");
                stream = signal;
                video.id = "livestream";
                video.srcObject = stream;
                video.play();

                video.onloadeddata = () => {
                    updatedCanvas();
                }

                const updatedCanvas = () => {
                    if (!this.play) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        video = null;
                        if (stream) {
                            const tracks = stream.getTracks();
                            tracks.forEach(track => track.stop());
                        }
                        return;
                    }
                    ctx.drawImage(video, 0, 0);
                    window.requestAnimationFrame(updatedCanvas);
                    simplyfiImageTwoColor(170, 125, 255);
                }

                const simplyfiImageTwoColor = (threshold, light, dark) => {
                    if (!this.play) return;
                    const videoData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = videoData.data;

                    //set bandwidths for inputs;
                    threshold = threshold < 0 ? 0 : (threshold > 255 ? 255 : threshold);
                    light = light < 0 ? 0 : (light > 255 ? 255 : light);
                    dark = dark < 0 ? 0 : (dark > 255 ? 255 : dark);

                    for (let i = 0; i < data.length; i += 4) {
                        const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                        data[i] = brightness < threshold ? light : dark; // Red
                        data[i + 1] = brightness < threshold ? light : dark; // Green
                        data[i + 2] = brightness < threshold ? light : dark; // Blue
                    }

                    ctx.putImageData(videoData, 0, 0);

                }


            }).catch(error => {
                ctx.clearRect(0, 0, canvas.width, canvas.heigth);
                alert(`Error: ${error} Please accept the camera-access in your settings...`)
            });

        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.heigth);
        }

    }
}

export { camSign };