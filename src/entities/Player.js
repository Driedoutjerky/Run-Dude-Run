import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 40, 40, 0xff0000);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);

    // --- Player Stats ---
    this.stats = {
      health: 100,
      maxHealth: 100,
      moveSpeed: 250,
      jumpVelocity: -400
    };

    // --- Jump Logic ---
    this.baseMaxJumps = 2;
    this.maxJumps = this.baseMaxJumps;
    this.jumpCount = 0;
    this.extraJumpActive = false;

    // --- Input ---
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }

  update() {
    const body = this.body;

    // ----------------------------
    // HORIZONTAL MOVEMENT
    // ----------------------------
    const left = this.cursors.left.isDown || this.keyA.isDown;
    const right = this.cursors.right.isDown || this.keyD.isDown;

    if (left) {
      body.setVelocityX(-this.stats.moveSpeed);
    } else if (right) {
      body.setVelocityX(this.stats.moveSpeed);
    } else {
      body.setVelocityX(0);
    }

    // ----------------------------
    // JUMPING
    // ----------------------------
    const onGround = body.blocked.down || body.touching.down;

    if (onGround) {
      this.jumpCount = 0;
    }

    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.keyW) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.space);

    if (jumpPressed && this.jumpCount < this.maxJumps) {
      body.setVelocityY(this.stats.jumpVelocity);
      this.jumpCount++;

      // If using extra jump, remove ability once used
      if (this.extraJumpActive && this.jumpCount === this.maxJumps) {
        this.extraJumpActive = false;
        this.maxJumps = this.baseMaxJumps;
      }
    }
  }

  // ----------------------------
  // METHODS PICKUPS CAN CALL
  // ----------------------------
  heal(amount) {
    this.stats.health = Math.min(this.stats.health + amount, this.stats.maxHealth);
  }

  addSpeed(amount) {
    this.stats.moveSpeed += amount;
  }

  grantExtraJump() {
    if (!this.extraJumpActive) {
      this.extraJumpActive = true;
      this.maxJumps = this.baseMaxJumps + 1;
    }
  }
}
