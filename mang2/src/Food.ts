import Canvas from "./Canvas";
import GameObject from "./GameObject";
import SnakeBody from "./SnakeBody";
import { getRandomInt } from './utils';

class Food extends GameObject {
  constructor(canvas: Canvas, x: number, y: number) {
    super(canvas, x, y);
    const newXCellCoord = this.canvas.getCellCoordinates(getRandomInt(2, this.canvas.getXCellAmounts()));
    const newYCellCoord = this.canvas.getCellCoordinates(getRandomInt(2, this.canvas.getYCellAmounts()));
    this.spawn(newXCellCoord, newYCellCoord);
  }

  draw() {
    this.canvas.drawCell(this.x, this.y, 'red');
  }

  spawn(x: number, y: number) {
    this.x = x;
    this.y = y;
  }


  handleSpawn(snakeX: number, snakeY: number, snakeBodyList: SnakeBody[]) {
    let isEmptyCell: boolean = false;
    let newXCellCoord: number = 0;
    let newYCellCoord: number = 0;

    while (!isEmptyCell) {
      newXCellCoord = this.canvas.getCellCoordinates(getRandomInt(1, this.canvas.getXCellAmounts()))
      newYCellCoord = this.canvas.getCellCoordinates(getRandomInt(1, this.canvas.getYCellAmounts()))

      if (snakeX !== newXCellCoord && snakeY !== newYCellCoord) {
        isEmptyCell = true;
      }

      if (!isEmptyCell) continue;

      for (let i = 0; i < snakeBodyList.length; i++) {
        if (snakeBodyList[i].getX() !== newXCellCoord && snakeBodyList[i].getY() !== newYCellCoord) {
          isEmptyCell = true;
        } else {
          isEmptyCell = false;
          break;
        }
      }
    }

    this.spawn(newXCellCoord, newYCellCoord);
  }
}

export default Food;
