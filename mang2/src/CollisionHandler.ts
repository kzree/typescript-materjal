import Canvas from "./Canvas";
import Food from "./Food";
import SnakeBody from "./SnakeBody";

class CollisionHandler {
  private canvas: Canvas;
  private food: Food;

  constructor(canvas: Canvas, food: Food) {
    this.canvas = canvas;
    this.food = food;
  }

  checkIfCollisionWithFood(x: number, y: number): boolean {
    return x === this.food.getX() && y === this.food.getY();
  }

  handleFoodCollision(snakeBodyList: SnakeBody[], previousX: number, previousY: number, snakeX: number, snakeY: number) {
    if (snakeBodyList.length === 0) {
      snakeBodyList.push(new SnakeBody(this.canvas, previousX, previousY));
    } else {
      const lastBodyIndex = snakeBodyList.length - 1;
      snakeBodyList.push(new SnakeBody(this.canvas, snakeBodyList[lastBodyIndex].getPreviousX(), snakeBodyList[lastBodyIndex].getPreviousY()))
    }
    this.food.handleSpawn(snakeX, snakeY, snakeBodyList);
  }

  checkIfCollisionWithSnake(x: number, y: number, snakeBodyList: SnakeBody[]): boolean {
    if (snakeBodyList.length > 2) {
      for (let i = 2; i < snakeBodyList.length; i++) {
        if (snakeBodyList[i].getX() === x && snakeBodyList[i].getY() === y) {
          return true;
        }
      }
    }
    return false;
  }

  checkIfCollisionWithWall(x: number, y: number): boolean {
    return x < 0 || y < 0 || x > this.canvas.getWidth() || y > this.canvas.getHeight();
  }
}

export default CollisionHandler;