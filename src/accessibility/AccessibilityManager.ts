import type { Direction } from '../utils/constants';

export class AccessibilityManager {
  private liveRegion: HTMLElement | null = null;
  private announceQueue: string[] = [];
  private isAnnouncing: boolean = false;
  private lastScore: number = 0;

  constructor() {
    this.initLiveRegion();
  }

  private initLiveRegion(): void {
    // Try to find existing live region in HTML
    this.liveRegion = document.getElementById('a11y-live-region');

    if (!this.liveRegion) {
      // Create new live region if not in HTML
      this.liveRegion = document.createElement('div');
      this.liveRegion.id = 'a11y-live-region';
      this.liveRegion.setAttribute('role', 'status');
      this.liveRegion.setAttribute('aria-live', 'polite');
      this.liveRegion.setAttribute('aria-atomic', 'true');
      this.liveRegion.className = 'sr-only';
      this.liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `;
      document.body.appendChild(this.liveRegion);
    }
  }

  announce(message: string): void {
    if (!this.liveRegion) return;

    this.announceQueue.push(message);
    if (!this.isAnnouncing) {
      this.processQueue();
    }
  }

  private processQueue(): void {
    if (this.announceQueue.length === 0) {
      this.isAnnouncing = false;
      return;
    }

    this.isAnnouncing = true;
    const message = this.announceQueue.shift();
    if (this.liveRegion && message) {
      this.liveRegion.textContent = message;
    }

    setTimeout(() => this.processQueue(), 300);
  }

  announceScore(score: number): void {
    this.lastScore = score;
    this.announce(`得分: ${score}`);
  }

  announceGameState(state: string): void {
    const stateMessages: Record<string, string> = {
      initial: '游戏未开始',
      ready: '游戏准备就绪',
      running: '游戏进行中',
      paused: '游戏已暂停，按空格键继续',
      gameover: `游戏结束，最终得分: ${this.lastScore}`
    };
    this.announce(stateMessages[state] || state);
  }

  announceDirection(dir: Direction): void {
    const directionNames: Record<string, string> = {
      '0,-1': '上',
      '0,1': '下',
      '-1,0': '左',
      '1,0': '右'
    };
    const key = `${dir.x},${dir.y}`;
    this.announce(`蛇向${directionNames[key]}移动`);
  }

  announceFoodEaten(): void {
    this.announce('吃到食物');
  }

  announceCollision(type: 'wall' | 'body'): void {
    const message = type === 'wall' ? '撞到墙壁' : '撞到自己';
    this.announce(message);
  }

  setLastScore(score: number): void {
    this.lastScore = score;
  }
}
