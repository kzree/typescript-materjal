class Canvas {
  private cellSize: number;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(id: string, cellSize: number) {
    this.canvas = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.cellSize = cellSize;
  }

  getWidth(): number {
    return this.canvas.width;
  }

  getHeight(): number {
    return this.canvas.height;
  }

  getCellSize(): number {
    return this.cellSize;
  }

  getXCellAmounts(): number {
    return this.canvas.width / this.cellSize;
  }

  getYCellAmounts(): number {
    return this.canvas.height / this.cellSize;
  }

  getCellCoordinates(cellNumber: number): number {
    return this.cellSize * cellNumber - this.cellSize / 2;
  }

  drawLine(startX: number, startY: number, endX: number, endY: number, color: string = "#ffffff") {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }

  drawRectangle(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
  }

  drawCell(x: number, y: number, color: string) {
    this.drawRectangle(x, y, this.cellSize, this.cellSize, color);
  }

  drawHelperLines() {
    for (let i = this.cellSize; i <= this.canvas.width; i += this.cellSize) {
      this.drawLine(i - 1, 0, i - 1, this.canvas.height);
    }
    for (let i = this.cellSize; i <= this.canvas.height; i += this.cellSize) {
      this.drawLine(0, i - 1, this.canvas.width, i - 1);
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawRectangle(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width, this.canvas.height, 'black');
  }
}

export default Canvas;
