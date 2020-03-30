export default class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "Boot"
    });
  }

  preload() {
    this.load.image("thelucasart", "assets/images/game/thelucasart.png");
  }

  create() {
    this.scene.start("Preloader");
  }

  update() {}
}
