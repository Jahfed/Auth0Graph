class camSign {
    constructor(canvasName) {
        //initallize VideoObject and canvas object
        const canvas = document.getElementById(canvasName);
        const ctx = canvas.getContext("2d");
        let video = null;

        this.start = function () {
            //Load cam
            const getCam = navigator.mediaDevices.getUserMedia({ video: true });
            getCam.then(function (signal) {
                video = document.createElement("video");
                video.srcObject = signal;
                video.play();

                video.onloadeddata = function () {
                    updatedCanvas();
                }

                function updatedCanvas() {
                    ctx.drawImage(video, 0, 0);
                    window.requestAnimationFrame(updatedCanvas);
                    simplyfiImageTwoColor(180, 0, 255);
                }

                function simplyfiImageTwoColor(threshold, light, dark) {
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
                    console.log("drawn");
                }
            }).catch(function (error) {
                alert(`Error: ${error} Please accept the camera-access in your settings...`)
            });
        }
    }
}

export { camSign };