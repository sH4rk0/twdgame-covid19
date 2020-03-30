import Game from "../scenes/Game";
import Explosion from "./Explosion";
export default class Goal extends Phaser.GameObjects.Image {
  private _config: any;
  private _gameplay: Game;
  private _tween: number = 0.24;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    console.log("create goal");
    this._gameplay = <Game>this._config.scene;

    this.setScale(1)
      .setX(1300)
      .setY(800)
      .setOrigin(0.5, 1)
      .setDepth(90);

    this._gameplay.add.existing(this);
  }

  update(time: number, delta: number) {
    if (this.x < 0) {
      this.destroy();
    }
    this.x -= this._tween * delta * this._gameplay.getTweenVelocity();
  }
}
