import Phaser from 'phaser';

export class ControlsHint {
  private scene: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private hintText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    const centerX = this.scene.scale.width / 2;
    const bottomY = this.scene.scale.height - 30;

    this.container = this.scene.add.container(centerX, bottomY);

    this.hintText = this.scene.add.text(0, 0, '方向键 / WASD / 游戏手柄 控制移动', {
      fontSize: '14px',
      color: '#666666',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.container.add([this.hintText]);
  }

  show(): void {
    this.container.setVisible(true);
  }

  hide(): void {
    this.container.setVisible(false);
  }

  setText(text: string): void {
    this.hintText.setText(text);
  }

  setVisible(visible: boolean): void {
    this.container.setVisible(visible);
  }
}
