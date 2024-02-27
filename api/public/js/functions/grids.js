
class Square {
    constructor(os_x = 0, os_y = 0, size, color, canvas) {
        const ctx = canvas.getContext("2d")
        this.x = os_x;
        this.y = os_y;
        this.size = size;
        this.color = color;
        //draw the Square of the grid
        this.draw = function () {
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.strokeRect(this.x, this.y, this.size, this.size);
        };
    }
};

class Grid {
    //Creates a grid object with multiple squares in it. 
    constructor(size, marge, canvasName) {
        const canvas = document.getElementById(canvasName);
        const ctx = canvas.getContext("2d");
        this.colors = ["#FF0000", "#00F0FF", "#00FF00", "#0000FF", "#4FF4FF", "#F0440F"];

        this.createGrid = function () {
            this.canvasWidth = canvas.width;
            this.canvasHeight = canvas.height;
            for (let j = 1; j < ((this.canvasHeight / (size + marge)) - 1); j++) {
                let y = j * (size + marge) + marge;
                for (let i = 1; i < ((this.canvasWidth / (size + marge)) - 1); i++) {

                    const color = this.colors[((j + i)) % this.colors.length];
                    const x = i * (size + marge) + marge;
                    const newSquare = new Square(x, y, size, color, canvas);
                    newSquare.draw();
                }
            }
        };
    }
}

export { Grid, Square };


