import Phaser from 'phaser';

export class GameOverModal {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  show(score: number, highScore: number, isNewHighScore: boolean, onRestart: () => void): void {
    // Semi-transparent overlay
    const overlay = this.scene.add.rectangle(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
      this.scene.scale.width,
      this.scene.scale.height,
      0x000000,
      0.7
    );

    // Game over title
    const titleText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 80,
      '游戏结束',
      {
        fontSize: '48px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);

    // Score display
    const scoreLabel = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 10,
      `得分: ${score}`,
      {
        fontSize: '32px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }
    ).setOrigin(0.5);

    // High score
    const highScoreText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 + 35,
      `最高分: ${highScore}`,
      {
        fontSize: '24px',
        color: '#aaaaaa',
        fontFamily: 'Arial'
      }
    ).setOrigin(0.5);

    // New high score indicator
    if (isNewHighScore) {
      this.scene.add.text(
        this.scene.scale.width / 2,
        this.scene.scale.height / 2 + 70,
        '🎉 新纪录！',
        {
          fontSize: '20px',
          color: '#ffd700',
          fontFamily: 'Arial'
        }
      ).setOrigin(0.5);
    }

    // Restart button
    const restartBtn = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 + 130,
      '重新开始',
      {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#2d7ef7',
        padding: { x: 20, y: 10 },
        fontFamily: 'Arial'
      }
    )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.hide();
        onRestart();
      })
      .on('pointerover', () => restartBtn.setStyle({ backgroundColor: '#1a5dc7' }))
      .on('pointerout', () => restartBtn.setStyle({ backgroundColor: '#2d7ef7' }));

    this.container = this.scene.add.container(0, 0, [
      overlay,
      titleText,
      scoreLabel,
      highScoreText,
      restartBtn
    ]);
  }

  hide(): void {
    this.container?.destroy();
    this.container = undefined;
  }
}
