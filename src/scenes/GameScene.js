import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.add.text(20, 20, 'Run Dude Run!', { fontSize: '32px', fill: '#ffffff' });

    // Example: create a player placeholder rectangle
    this.player = this.add.rectangle(400, 300, 40, 40, 0xff0000);
    this.physics.add.existing(this.player);

    this.player.body.setCollideWorldBounds(true);
  }

  update() {
    // Your game logic here
  }
}
