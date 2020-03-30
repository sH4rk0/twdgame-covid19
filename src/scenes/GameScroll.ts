export default class GameScroll extends Phaser.Scene {
  private _isStarted: boolean = false;
  private _rocks: Phaser.GameObjects.TileSprite;
  private _street1: Phaser.GameObjects.TileSprite;
  private _street2: Phaser.GameObjects.TileSprite;
  private _street3: Phaser.GameObjects.TileSprite;
  private _street4: Phaser.GameObjects.TileSprite;
  private _tweenVelocity: number;

  constructor() {
    super({
      key: "GameScroll"
    });
  }

  create() {
    this._isStarted = false;

    this.add
      .tileSprite(0, 0, 1280, 800, "sky")
      .setScale(4)
      .setOrigin(0)
      .setScrollFactor(0);

    this._rocks = this.add
      .tileSprite(0, 800 - 77 - 53 - 32 - 56, 1280, 96, "rocks")
      .setOrigin(0, 1);
    this._street1 = this.add
      .tileSprite(0, 800 - 77 - 53 - 32, 1280, 109, "street1")
      .setOrigin(0, 1);
    this._street2 = this.add
      .tileSprite(0, 800 - 77 - 53, 1280, 32, "street2")
      .setOrigin(0, 1);
    this._street3 = this.add
      .tileSprite(0, 800 - 77, 1280, 53, "street3")
      .setOrigin(0, 1);
    this._street4 = this.add
      .tileSprite(0, 800, 1280, 77, "street4")
      .setOrigin(0, 1);
  }

  setStarted(_value: boolean) {
    this._isStarted = _value;
  }

  getStarted(): boolean {
    return this._isStarted;
  }

  getTweenVelocity(): number {
    return this._tweenVelocity;
  }

  setTweenVelocity(_value: number) {
    this._tweenVelocity = _value;
  }

  updateData(_values: { isStarted: boolean; tween: number }) {
    this.setStarted(_values.isStarted);
    this.setTweenVelocity(_values.tween);
  }

  update(time: number, delta: number) {
    if (this._isStarted) {
      this._rocks.tilePositionX +=
        0.05 * delta * (this.getTweenVelocity() / 10);
      this._street1.tilePositionX += 0.22 * delta * this.getTweenVelocity();
      this._street2.tilePositionX += 0.23 * delta * this.getTweenVelocity();
      this._street3.tilePositionX += 0.24 * delta * this.getTweenVelocity();
      this._street4.tilePositionX += 0.25 * delta * this.getTweenVelocity();
    }
  }
}
