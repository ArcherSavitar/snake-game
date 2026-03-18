import Phaser from 'phaser';
import { GAME_CONFIG } from '../utils/constants';

export class HUD {
  private scene: Phaser.Scene;
  private scoreText!: Phaser.GameObjects.Text;
  private highScoreText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    // Score display
    this.scoreText = this.scene.add.text(20, 20, '得分: 0', {
      fontSize: '24px',
      color: GAME_CONFIG.COLORS.TEXT,
      fontFamily: 'Arial'
    });

    // High score display
    this.highScoreText = this.scene.add.text(20, 50, '最高分: 0', {
      fontSize: '16px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });

    // Level/speed display
    this.levelText = this.scene.add.text(20, 75, '速度: 1', {
      fontSize: '16px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
  }

  updateScore(score: number): void {
    this.scoreText.setText(`得分: ${score}`);
  }

  updateHighScore(score: number): void {
    this.highScoreText.setText(`最高分: ${score}`);
  }

  updateSpeed(speed: number): void {
    const level = Math.floor((GAME_CONFIG.INITIAL_SPEED - speed) / GAME_CONFIG.SPEED_DECREASE) + 1;
    this.levelText.setText(`速度: ${level}`);
  }

  setVisible(visible: boolean): void {
    this.scoreText.setVisible(visible);
    this.highScoreText.setVisible(visible);
    this.levelText.setVisible(visible);
  }
}
