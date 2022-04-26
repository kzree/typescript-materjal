import Canvas from './Canvas';

class GameObject {
  protected x: number;
  protected y: number;
  protected previousX: number = 0;
  protected previousY: number = 0;
  protected canvas: Canvas;

  constructor(canvas: Canvas, x: number, y: number) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getPreviousX() {
    return this.previousX;
  }

  getPreviousY() {
    return this.previousY;
  }

  setPreviousX(val: number) {
    this.previousX = val;
  }

  setPrevousY(val: number) {
    this.previousY = val;
  }

  setX(val: number) {
    this.x = val;
  }

  setY(val: number) {
    this.y = val;
  }

  draw() {}
}

export default GameObject;
