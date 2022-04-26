import GameObject from "./GameObject";
import Canvas from './Canvas';
import KeyboardHandler from "./KeyboardHandler";
import SnakeBody from "./SnakeBody";
import CollisionHandler from "./CollisionHandler";

class SnakeHead extends GameObject {
  private isAlive: boolean = true;
  private renderBody: boolean = true;
  private snakeBodyList: SnakeBody[] = [];

  private keyboardHandler: KeyboardHandler;
  private collisionHandler: CollisionHandler;

  constructor(canvas: Canvas, keyboardHandler: KeyboardHandler, collisionHandler: CollisionHandler, x: number, y: number) {
    super(canvas, x, y);
    this.keyboardHandler = keyboardHandler;
    this.collisionHandler = collisionHandler;
  }

  // #ffffff = white
  draw() {
    if (this.renderBody) {
      this.canvas.drawCell(this.x, this.y, "#ffffff");
      this.snakeBodyList.forEach(body => body.draw());
    }
    if (!this.isAlive) this.renderBody = !this.renderBody;
  }

  handleBodyMovement() {
    for (let i = 0; i < this.snakeBodyList.length; i++) {
      if (i === 0) {
        this.snakeBodyList[i].move(this.previousX, this.previousY);
      } else {
        const previousBody = this.snakeBodyList[i - 1];
        this.snakeBodyList[i].move(previousBody.getPreviousX(), previousBody.getPreviousY());
      }
    }
  }

  handleMovement(newX: number, newY: number) {    
    if (this.collisionHandler.checkIfCollisionWithFood(newX, newY)) {
      this.collisionHandler.handleFoodCollision(this.snakeBodyList, this.previousX, this.previousY, this.x, this.y);
    }
    if (this.collisionHandler.checkIfCollisionWithWall(newX, newY) ||
        this.collisionHandler.checkIfCollisionWithSnake(newX, newY, this.snakeBodyList)) {
      this.isAlive = false;
    } else {
      this.x = newX;
      this.y = newY;
    }
  }

  move() {
    const activeKey = this.keyboardHandler.getActiveKey();
    const cellSize = this.canvas.getCellSize();

    if (!this.isAlive) return;
    this.previousX = this.x;
    this.previousY = this.y;

    switch (activeKey) {
      case "w":
        this.handleMovement(this.x, this.y - cellSize);
        break;
      case "s":
        this.handleMovement(this.x, this.y + cellSize);
        break;
      case "d":
        this.handleMovement(this.x + cellSize, this.y);
        break;
      case "a":
        this.handleMovement(this.x - cellSize, this.y);
        break;
    }
    if (this.isAlive) this.handleBodyMovement();
  }
}

export default SnakeHead;
