import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Example asset (replace with your own)
    // this.load.image('player', 'assets/player.png');

    // Add simple loading text
    this.add.text(20, 20, 'Loading...', { fontSize: '28px', fill: '#ffffff' });
  }

  create() {
    // Go to main game
    this.scene.start('GameScene');
  }
}
