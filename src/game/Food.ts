import type { Position } from '../utils/constants';

export class Food {
  private position: Position = { x: 0, y: 0 };
  private cols: number;
  private rows: number;

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.respawn([]);
  }

  respawn(occupiedPositions: Position[]): void {
    let newPosition: Position;

    do {
      newPosition = {
        x: Math.floor(Math.random() * this.cols),
        y: Math.floor(Math.random() * this.rows)
      };
    } while (occupiedPositions.some(p => p.x === newPosition.x && p.y === newPosition.y));

    this.position = newPosition;
  }

  getPosition(): Position {
    return { ...this.position };
  }

  checkCollision(head: Position): boolean {
    return head.x === this.position.x && head.y === this.position.y;
  }

  setGridSize(cols: number, rows: number): void {
    this.cols = cols;
    this.rows = rows;
  }
}
