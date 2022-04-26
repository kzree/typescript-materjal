import Canvas from "./Canvas";
import GameObject from "./GameObject";

class SnakeBody extends GameObject {
  constructor(canvas: Canvas, x: number, y: number) {
    super(canvas, x, y);
  }

  draw() {
    this.canvas.drawCell(this.x, this.y, '#ffffff');
  }

  move(x:number, y: number) {
    this.previousX = this.x;
    this.previousY = this.y;
    this.x = x;
    this.y = y;
  }
}

export default SnakeBody;
