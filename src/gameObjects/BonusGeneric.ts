import Game from "../scenes/Game";
import Explosion from "./Explosion";
export default class BonusGeneric extends Phaser.Physics.Arcade.Sprite {
  private _config: any;
  private _gameplay: Game;
  private _score: number;
  private _position: Array<{
    y: number;
    depth: number;
    vel: number;
    dur: number;
    tween: number;
  }> = [
    {
      y: 580 - 20,
      depth: 99,
      vel: -925,
      dur: 1550,
      tween: 0.23
    },
    {
      y: 640 - 30,
      depth: 100,
      vel: -935,
      dur: 1500,
      tween: 0.24
    },
    {
      y: 700 - 30,
      depth: 101,
      vel: -965,
      dur: 1410,
      tween: 0.25
    }
  ];

  private _type: Array<{
    name: string;
    score: number;
    sound: Array<string>;
  }> = [
    {
      name: "webmaster",
      score: 5000,
      sound: ["webmaster"]
    },
    {
      name: "neanderthal",
      score: 49000,
      sound: ["uomo-di-neanderthal"]
    },
    {
      name: "motorizzato",
      score: 1000,
      sound: ["cafone-motorizzato"]
    },
    {
      name: "capitano",
      score: 100,
      sound: ["cafone", "poffete", "chebello"]
    },
    {
      name: "banchiere",
      score: 100,
      sound: ["cafone", "poffete", "chebello"]
    },
    {
      name: "tuta",
      score: 100,
      sound: ["cafone", "poffete", "chebello"]
    },

    {
      name: "bambino",
      score: 100,
      sound: ["poffete"]
    },
    {
      name: "soldato",
      score: 100,
      sound: ["cafone", "poffete", "chebello"]
    },
    {
      name: "vecchio",
      score: 100,
      sound: ["cafone", "poffete", "chebello"]
    },
    {
      name: "vecchia",
      score: 500,
      sound: ["cafone", "poffete", "chebello"]
    },
    {
      name: "barbone",
      score: 100,
      sound: ["cafone", "poffete", "chebello"]
    },
    {
      name: "impiegato",
      score: 100,
      sound: ["cafone", "poffete", "chebello"]
    }
  ];
  private _typeIndex: number;
  private _tween: number;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this._typeIndex = this._config.type;
    this._config.scene.physics.world.enable(this);
    this._gameplay = <Game>this._config.scene;
    let _frame: number = Phaser.Math.RND.integerInRange(0, 3);
    let _rnd: number = Phaser.Math.RND.integerInRange(0, 2);
    this.setScale(3)
      .setX(1400)
      .setY(this._position[_rnd].y)
      .setOrigin(0.5)
      .setDepth(this._position[_rnd].depth);
    this._tween = this._position[_rnd].tween;
    this.name = this._type[this._typeIndex].name;
    this._score = this._type[this._typeIndex].score;

    var animConfig = {
      key: "idle-" + this._typeIndex * 4,
      frames: this._config.scene.anims.generateFrameNumbers("bonus", {
        frames: [
          0 + this._typeIndex * 4,
          1 + this._typeIndex * 4,
          2 + this._typeIndex * 4,
          3 + this._typeIndex * 4,
          2 + this._typeIndex * 4,
          1 + this._typeIndex * 4
        ]
      }),
      frameRate: 8,
      repeat: -1
    };

    this._config.scene.anims.create(animConfig);

    this.play("idle-" + this._typeIndex * 4);

    this._gameplay.add.existing(this);
  }
  update(time: number, delta: number) {
    if (this.x < -200) {
      this.destroy();
    }

    this.x -= this._tween * delta * this._gameplay.getTweenVelocity();
  }

  kill() {
    let sound: Phaser.Sound.BaseSound = this._config.scene.sound.add(
      Phaser.Math.RND.pick(this._type[this._typeIndex].sound)
    );
    sound.play({ volume: 0.5 });

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
    particles.emitParticleAt(this.x, this.y).setDepth(101);

    this.destroy();
  }

  getScore(): number {
    return this._score;
  }
}
