import Canvas from './Canvas';
import CollisionHandler from './CollisionHandler';
import Food from './Food';
import GameObject from './GameObject';
import KeyboardHandler from './KeyboardHandler';
import SnakeHead from './SnakeHead';

class Main {
  private cellSize: number = 20;
  private timeSinceLastFrame: number;

  private canvas: Canvas;
  private player: SnakeHead;
  private food: Food;
  private keyboardHandler: KeyboardHandler;
  private collisionHandler: CollisionHandler;
  private gameObjects: GameObject[] = [];

  constructor() {
    this.canvas = new Canvas("canvas", this.cellSize);
    this.keyboardHandler = new KeyboardHandler();
    this.food = new Food(this.canvas, 0, 0);
    this.collisionHandler = new CollisionHandler(this.canvas, this.food);
    this.player = new SnakeHead(this.canvas, this.keyboardHandler, this.collisionHandler, 10, 10);
  }

  initGameObjects() {
    this.gameObjects.push(this.player);
    this.gameObjects.push(this.food);
  }

  draw() {
    if (!this.timeSinceLastFrame || Date.now() - this.timeSinceLastFrame > 100) {
      this.player.move();
      this.canvas.clearCanvas();
      this.gameObjects.forEach(gameObject => {
        gameObject.draw();
      })
      this.timeSinceLastFrame = Date.now();
    }
    requestAnimationFrame(() => this.draw())
  }

  run() {
    this.initGameObjects();
    this.draw();
  }
}

const game = new Main();
game.run();
