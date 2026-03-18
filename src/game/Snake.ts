import { DIRECTIONS, type Direction, type Position } from '../utils/constants';

export class Snake {
  private body: Position[] = [];
  private direction: Direction = DIRECTIONS.RIGHT;
  private nextDirection: Direction = DIRECTIONS.RIGHT;
  private growPending: number = 0;
  private cols: number;
  private rows: number;

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.reset();
  }

  reset(): void {
    this.body = [{
      x: Math.floor(this.cols / 2),
      y: Math.floor(this.rows / 2)
    }];
    this.direction = DIRECTIONS.RIGHT;
    this.nextDirection = DIRECTIONS.RIGHT;
    this.growPending = 0;
  }

  setDirection(dir: Direction): void {
    // Prevent reversing direction
    if (this.body.length > 1) {
      const head = this.body[0];
      const second = this.body[1];
      if (head.x + dir.x === second.x && head.y + dir.y === second.y) {
        return;
      }
    }
    this.nextDirection = dir;
  }

  move(): Position {
    this.direction = this.nextDirection;
    const head = this.body[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y
    };

    this.body.unshift(newHead);

    if (this.growPending > 0) {
      this.growPending--;
    } else {
      this.body.pop();
    }

    return newHead;
  }

  grow(amount: number = 1): void {
    this.growPending += amount;
  }

  getHead(): Position {
    return this.body[0];
  }

  getBody(): Position[] {
    return [...this.body];
  }

  getLength(): number {
    return this.body.length;
  }

  checkCollision(): 'wall' | 'body' | null {
    const head = this.body[0];

    // Wall collision
    if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.rows) {
      return 'wall';
    }

    // Self collision (start from 4th segment)
    for (let i = 4; i < this.body.length; i++) {
      if (this.body[i].x === head.x && this.body[i].y === head.y) {
        return 'body';
      }
    }

    return null;
  }

  setGridSize(cols: number, rows: number): void {
    this.cols = cols;
    this.rows = rows;
  }
}
