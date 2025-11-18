import Phaser from 'phaser';
import Player from '../entities/Player.js';

import HealthPickup from '../pickups/HealthPickup.js';
import SpeedPickup from '../pickups/SpeedPickup.js';
import JumpPickup from '../pickups/JumpPickup.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // --- Ground ---
    const ground = this.add.rectangle(400, 580, 800, 40, 0x00aa00);
    this.physics.add.existing(ground, true);

    // --- Player ---
    this.player = new Player(this, 100, 300);
    this.physics.add.collider(this.player, ground);

    // --- UI ---
    this.statsText = this.add.text(16, 16, '', {
      fontSize: '18px',
      fill: '#ffffff'
    });

    // --- PICKUPS ---
    this.hpPickup = new HealthPickup(this, 250, 540);
    this.speedPickup = new SpeedPickup(this, 400, 540);
    this.jumpPickup = new JumpPickup(this, 550, 540);

    this.physics.add.overlap(this.player, this.hpPickup, () => {
      this.hpPickup.applyEffect(this.player.stats);
      this.hpPickup.destroy();
      this.updateStatsText();
    });

    this.physics.add.overlap(this.player, this.speedPickup, () => {
      this.speedPickup.applyEffect(this.player.stats);
      this.speedPickup.destroy();
      this.updateStatsText();
    });

    this.physics.add.overlap(this.player, this.jumpPickup, () => {
      this.jumpPickup.applyEffect(this.player);
      this.jumpPickup.destroy();
      this.updateStatsText();
    });

    this.updateStatsText();
  }

  update() {
    this.player.update();
  }

  updateStatsText() {
    this.statsText.setText(
      `Health: ${this.player.stats.health}/${this.player.stats.maxHealth}` +
      `\nSpeed: ${this.player.stats.moveSpeed}` +
      `\nJump Power: ${-this.player.stats.jumpVelocity}` +
      `\nMax Jumps: ${this.player.maxJumps}`
    );
  }
}
