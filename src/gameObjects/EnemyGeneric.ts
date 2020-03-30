import Game from "../scenes/Game";
import Explosion from "./Explosion";
export default class EnemyGeneric extends Phaser.Physics.Arcade.Sprite {
  private _config: any;
  private _gameplay: Game;
  private _isDying: boolean;
  private _index: number;
  private _position: Array<{
    y: number;
    depth: number;
    vel: number;
    dur: number;
    tween: number;
  }> = [
    { y: 560, depth: 99, vel: -925, dur: 1550, tween: 0.23 },
    { y: 610, depth: 100, vel: -935, dur: 1500, tween: 0.24 },
    { y: 670, depth: 101, vel: -965, dur: 1410, tween: 0.25 }
  ];

  private _damages: Array<number> = [50, 75, 100, 200, 200, 100, 75, 50];
  private _tween: number;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this.name = this._config.key;
    this._isDying = false;
    this._config.scene.physics.world.enable(this);
    this._gameplay = <Game>this._config.scene;
    this._index = Phaser.Math.RND.integerInRange(0, 7);
    let _rnd: number = Phaser.Math.RND.integerInRange(0, 2);

    this.setFrame(this._index)
      .setScale(1)
      .setX(1400)
      .setY(this._position[_rnd].y)
      .setOrigin(0.5, 0)
      .setDepth(this._position[_rnd].depth);
    this._tween = this._position[_rnd].tween;
    this._gameplay.add.existing(this);
  }

  stopTween() {}

  update(time: number, delta: number) {
    if (this.x < -200) {
      this.destroy();
    }

    this.x -= this._tween * delta * this._gameplay.getTweenVelocity();
  }

  kill(type: string) {
    let particles = this._config.scene.add.particles("blockparts").setDepth(10);
    particles.createEmitter({
      frame: [1],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 1,
      lifespan: 4000,
      alpha: { start: 1, end: 0 },
      scale: 2,
      rotate: { start: 0, end: 360, ease: "Back.easeOut" },
      gravityY: 800,
      on: false
    });
    particles.createEmitter({
      frame: [0],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 1,
      lifespan: 4000,
      alpha: { start: 1, end: 0 },
      scale: 2,
      rotate: { start: 10, end: 360, ease: "Back.easeOut" },
      gravityY: 800,
      on: false
    });
    particles.createEmitter({
      frame: [2],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 1,
      lifespan: 4000,
      alpha: { start: 1, end: 0 },
      scale: 2,
      rotate: { start: 10, end: 360, ease: "Back.easeOut" },
      gravityY: 800,
      on: false
    });
    particles.createEmitter({
      frame: [3],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 1,
      lifespan: 4000,
      alpha: { start: 1, end: 0 },
      scale: 2,
      rotate: { start: 10, end: 360, ease: "Back.easeOut" },
      gravityY: 800,
      on: false
    });
    particles.emitParticleAt(this.x, this.y).setDepth(101);

    this.destroy();
  }

  getDamage(): number {
    return this._damages[this._index];
  }
}
