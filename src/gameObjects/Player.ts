import Game from "../scenes/Game";
import Explosion from "../gameObjects/Explosion";

export default class Player extends Phaser.GameObjects.Container {
  private _config: any;
  private _driving: boolean;
  private _head: Phaser.GameObjects.Sprite;
  private _buzzer: Phaser.GameObjects.Sprite;
  private _car: Phaser.GameObjects.Sprite;
  private _wheel1: Phaser.GameObjects.Image;
  private _wheel2: Phaser.GameObjects.Image;
  private _hitArea: Phaser.GameObjects.Image;
  private _gamePlay: Game;
  private _lane: number = 1;
  private _lanes: Array<number> = [150, 200, 260];
  private _currentLane: number = 1;
  private _W: Phaser.Input.Keyboard.Key;
  private _S: Phaser.Input.Keyboard.Key;
  private _UP: Phaser.Input.Keyboard.Key;
  private _DOWN: Phaser.Input.Keyboard.Key;
  private _cars: Array<Array<{ x: number; y: number; depth: number }>> = [
    [
      { x: 28, y: 548, depth: 101 },
      { x: 60, y: 655, depth: 99 },
      { x: 187, y: 655, depth: 99 },
      { x: 100, y: 600, depth: 100 },
      { x: 130, y: 513, depth: 100 }
    ],
    [
      { x: 115, y: 534, depth: 99 },
      { x: 60, y: 655, depth: 99 },
      { x: 188, y: 655, depth: 99 },
      { x: 100, y: 600, depth: 100 },
      { x: 60, y: 520, depth: 100 }
    ]
  ];
  private _stopInput: boolean;

  constructor(params: any) {
    super(params.scene, params.x, params.y);
    this._config = params;

    this.create();
  }

  create() {
    this._gamePlay = <Game>this._config.scene;
    this._driving = false;
    this._stopInput = false;

    this._W = this._gamePlay.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W,
      undefined,
      true
    );

    this._S = this._gamePlay.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S,
      undefined,
      false
    );

    this._UP = this._gamePlay.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP,
      undefined,
      false
    );
    this._DOWN = this._gamePlay.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN,
      undefined,
      false
    );

    var animConfig = {
      key: "buzzer",
      frames: this._config.scene.anims.generateFrameNumbers("playerSirena", {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 7,
      repeat: -1
    };
    this._config.scene.anims.create(animConfig);

    let _car = Phaser.Math.RND.integerInRange(0, 1);

    this._head = this._gamePlay.add
      .sprite(this._cars[_car][0].x, this._cars[_car][0].y, "playerDeluca")
      .setOrigin(0.5)
      .setDepth(this._cars[_car][0].depth)
      .setScale(4)
      .setFrame(3);

    this._wheel1 = this._gamePlay.add
      .sprite(this._cars[_car][1].x, this._cars[_car][1].y, "playerWheel")
      .setOrigin(0.5)
      .setDepth(this._cars[_car][1].depth)
      .setScale(2);

    this._wheel2 = this._gamePlay.add
      .sprite(this._cars[_car][2].x, this._cars[_car][2].y, "playerWheel")
      .setOrigin(0.5)
      .setDepth(this._cars[_car][2].depth)
      .setScale(2);

    this._car = this._gamePlay.add
      .sprite(this._cars[_car][3].x, this._cars[_car][3].y, "playerCar")
      .setOrigin(0.5)
      .setDepth(this._cars[_car][3].depth)
      .setScale(2)
      .setFrame(_car);

    this._buzzer = this._gamePlay.add
      .sprite(this._cars[_car][4].x, this._cars[_car][4].y, "playerSirena")
      .setOrigin(0.5)
      .setDepth(this._cars[_car][4].depth)
      .setScale(2);

    this._hitArea = this._gamePlay.add.sprite(
      this._cars[_car][4].x,
      this._cars[_car][4].y,
      "playerEmpty"
    );
    this._gamePlay.physics.world.enable(this._hitArea);
    this._hitArea
      .setOrigin(0.5)
      .setScale(1)
      .setSize(50, 100)
      .setX(130)
      .setY(620)
      .setDepth(100);

    this._gamePlay._playerContainer.add([
      this._head,
      this._wheel1,
      this._wheel2,
      this._car,
      this._buzzer,
      this._hitArea
    ]);

    this._gamePlay.tweens.add({
      targets: [this._car, this._buzzer],
      y: "-=3.5",
      duration: 150,
      yoyo: true,
      ease: "Quad.easeOut",
      repeat: -1
    });

    this._gamePlay._playerContainer
      .setY(this._config.x)
      .setX(this._config.y)
      .setDepth(100);

    this._gamePlay.add.existing(this);
  }

  getHitArea() {
    return this._hitArea;
  }

  move(_direction: string) {
    switch (_direction) {
      case "up":
        this._lane--;
        if (this._lane < 0) this._lane = 0;

        break;

      case "down":
        this._lane++;
        if (this._lane > 2) this._lane = 2;

        break;
    }

    this.moveToLane();
  }

  moveToLane() {
    if (this._currentLane == this._lane) return;
    this._currentLane = this._lane;

    switch (this._lane) {
      case 0:
        this._hitArea.setDepth(99);
        this._gamePlay._playerContainer.setDepth(99);
        break;
      case 1:
        this._hitArea.setDepth(100);
        this._gamePlay._playerContainer.setDepth(100);
        break;
      case 2:
        this._hitArea.setDepth(101);
        this._gamePlay._playerContainer.setDepth(101);
        break;
    }

    this._gamePlay.tweens.add({
      targets: this._gamePlay._playerContainer,
      y: this._lanes[this._lane],
      duration: 100,
      ease: "Quad.easeOut"
    });
  }

  drive() {
    this._driving = true;
    this._head.setFrame(6);
    this._buzzer.play("buzzer");
  }

  stopDrive() {
    console.log("stop drive");
    this._driving = false;
    this._head.setFrame(0);
  }

  explode() {
    new Explosion({
      scene: this._gamePlay,
      key: "explosion",
      x: this._car.x,
      y: this._car.y,
      options: { type: 2 }
    });
    this._gamePlay.sound.add("explosion").play({ volume: 0.5 });

    let particles = this._config.scene.add.particles("bodyparts").setDepth(10);
    particles.createEmitter({
      frame: [1],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 1,
      lifespan: 1500,
      alpha: { start: 1, end: 0 },
      scale: 2,
      rotate: { start: 0, end: 360, ease: "Sine.easeOut" },
      gravityY: 800,
      on: false
    });
    particles.createEmitter({
      frame: [0],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 1,
      lifespan: 1500,
      alpha: { start: 1, end: 0 },
      scale: 2,
      rotate: { start: 10, end: 360, ease: "Sine.easeOut" },
      gravityY: 800,
      on: false
    });
    particles.createEmitter({
      frame: [2],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 1,
      lifespan: 1500,
      alpha: { start: 1, end: 0 },
      scale: 2,
      rotate: { start: 10, end: 360, ease: "Sine.easeOut" },
      gravityY: 800,
      on: false
    });
    particles.createEmitter({
      frame: [3],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 1,
      lifespan: 1500,
      alpha: { start: 1, end: 0 },
      scale: 2,
      rotate: { start: 10, end: 360, ease: "Sine.easeOut" },
      gravityY: 800,
      on: false
    });
    particles.emitParticleAt(this._car.x, this._car.y).setDepth(101);

    this._car.destroy();
    this._wheel1.destroy();
    this._wheel2.destroy();
    this._buzzer.destroy();
    this._head.destroy();
    this._hitArea.destroy();
    this.destroy();
    this._gamePlay.gameOver();
  }

  update(time: number, delta: number) {
    this._wheel1.rotation +=
      0.005 * delta * this._config.scene.getTweenVelocity();
    this._wheel2.rotation +=
      0.005 * delta * this._config.scene.getTweenVelocity();

    if (this._driving) {
      if (
        Phaser.Input.Keyboard.JustDown(this._DOWN) ||
        Phaser.Input.Keyboard.JustDown(this._S)
      ) {
        this.move("down");
      }
      if (
        Phaser.Input.Keyboard.JustDown(this._UP) ||
        Phaser.Input.Keyboard.JustDown(this._W)
      ) {
        this.move("up");
      }
    }
  }
}
