import Game from "../scenes/Game";
import { GameData } from "../GameData";

export default class HUD extends Phaser.Scene {
  private livesGroup: Phaser.GameObjects.Group;
  private _isPaused: boolean = false;
  private _gamePlay: Game;
  private _levelCompleted: boolean;
  private _started: boolean;
  private _scoreText: Phaser.GameObjects.BitmapText;
  private _scoreValue: number;
  private _directions: Array<string> = ["left", "right", "up", "down"];
  private _spawn: number;
  private _spawnMin: number;
  private _spawnMax: number;
  private _updateScore: Phaser.Events.EventEmitter;
  private _wave: Phaser.GameObjects.Text;
  private _waveTitle: Phaser.GameObjects.Text;
  private _swipeInput: any;
  private _enableSpawn: boolean;
  private _energyContainer: Phaser.GameObjects.Container;
  private _car: Phaser.GameObjects.Image;
  private _energyhud: Phaser.GameObjects.Image;
  private _energybar: Phaser.GameObjects.Sprite;
  private _energybarmask: Phaser.GameObjects.Sprite;
  private _damage: number = 0;
  private _carTween: Phaser.Tweens.Tween;
  private _cafoni: number;
  private _gameDuration: number = 90000;
  private _interval: Phaser.Time.TimerEvent;

  constructor() {
    super({
      key: "Hud"
    });
  }

  preload() {
    this.load.scenePlugin({
      key: "rexgesturesplugin",
      url: "/assets/js/rexgesture.js",
      sceneKey: "rexGestures"
    });
  }
  create(): void {
    console.log("create hud");
    this._spawnMin = 500;
    this._spawnMax = 1000;
    this._isPaused = false;
    this._damage = 0;
    this._cafoni = 0;
    //@ts-ignore
    this._swipeInput = this.rexGestures.add
      .swipe({ velocityThreshold: 1000, dir: 0 })
      .on("swipe", (swipe: any) => {}, this);

    this._gamePlay = <Game>this.scene.get("Game");
    this._energyhud = this.add.image(640, 60, "energyHud");
    this._energybar = this.add.sprite(725, 62, "energyBar");
    this._energybarmask = this.add.sprite(725, 62, "energyHud");
    this._energybarmask.visible = false;
    this._energybar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this._energybarmask
    );

    this._car = this.add.image(400, 66, "energyCar");

    //this._energyContainer=this.add.container(0,0,[ this._energyhud,this._energybar,this._energybarmask,this._car])

    this._carTween = this.tweens
      .add({
        targets: this._car,
        x: 1050,
        duration: this._gameDuration,
        onComplete: () => {
          this.winSequence();
        }
      })
      .pause();

    this._scoreText = this.add
      .bitmapText(205, 50, "arcade", "0")
      .setFontSize(25);
    this._scoreValue = 0;
    this._started = false;
    this._levelCompleted = false;
    this._enableSpawn = false;

    this._gamePlay.events.off("updateScore", this.updateScore, this);
    this._updateScore = this._gamePlay.events.on(
      "updateScore",
      this.updateScore,
      this
    );

    this._gamePlay.events.off("updateEnergy", this.updateEnergy, this);
    this._updateScore = this._gamePlay.events.on(
      "updateEnergy",
      this.updateEnergy,
      this
    );

    this.scale.on("orientationchange", (orientation: any) => {
      if (orientation === Phaser.Scale.PORTRAIT) {
        this.pauseGame();
      } else if (orientation === Phaser.Scale.LANDSCAPE) {
        this.resumeGame();
      }
    });

    this.input.keyboard.on("keydown-O", (event: Event) => {
      this.game.renderer.snapshot((image: any) => {
        let mimeType = "image/png";
        var imgURL = image.src;
        var dlLink = document.createElement("a");
        dlLink.download = "snapshot";
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [
          mimeType,
          dlLink.download,
          dlLink.href
        ].join(":");
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
      });
    });

    this.input.keyboard.on("keydown-P", (event: Event) => {
      if (this._isPaused) {
        this.resumeGame();
        this._carTween.resume();
        this._gamePlay.resumeMusic();
        this._interval.paused = false;
      } else {
        this._carTween.pause();
        this._gamePlay.pauseMusic();
        this.pauseGame();
        this._interval.paused = true;
      }
    });

    this.input.once("pointerdown", () => {
      this._waveTitle.destroy();
      this._gamePlay.tweens.add({
        targets: this._wave,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          this._started = true;
          this._carTween.play();
          this._gamePlay.startGame();
          this._spawn = this.time.now;

          this._interval = this.time.addEvent({
            delay: 10000,
            callback: () => {
              //console.log("sub");
              console.log("event");
              this._spawnMin -= 50;
              this._spawnMax -= 50;
            },
            callbackScope: this,
            loop: true
          });
          this.time.addEvent({
            delay: 3500,
            callback: () => {
              console.log("event");
              this._enableSpawn = true;
            },
            callbackScope: this
          });
        }
      });
    });

    this._wave = this.add
      .text(640, 200, "Get Ready", {})
      .setTint(0xff8200)
      .setOrigin(0.5)
      .setAlpha(0)
      .setStroke("#000000", 10)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(60);

    this._waveTitle = this.add
      .text(640, 270, "Tap/click to start")
      .setTint(0x00ff00)
      .setOrigin(0.5)
      .setAlpha(0)
      .setStroke("#000000", 3)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(30);

    this.setUpLevel();
  }

  update(time: number, delta: number) {
    if (this._started) {
      this.progress();
      if (this._swipeInput.isSwiped && !this._isPaused) {
        this._gamePlay.movePlayer(
          this.dumpDirectionStates(this._swipeInput).trim()
        );
      }

      if (this._spawn < this.time.now && this._enableSpawn && !this._isPaused) {
        this._spawn = this.time.now + this.calculateSpawn();
        this._gamePlay.createBlock();
      }
    }
  }

  calculateSpawn(): number {
    return Phaser.Math.RND.integerInRange(
      this._spawnMin - this.progress(),
      this._spawnMax - this.progress()
    );
  }

  progress(): number {
    this._gamePlay.setProgress(this._carTween.progress);
    return this._carTween.progress;
  }

  dumpDirectionStates(swipe: any) {
    let s = "";
    let dir;
    for (var i = 0, cnt = this._directions.length; i < cnt; i++) {
      dir = this._directions[i];
      if (swipe[dir]) {
        s += dir;
      }
    }
    return s;
  }

  private setUpLevel() {
    this._gamePlay.tweens.add({
      targets: this._wave,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this._gamePlay.tweens.add({
          targets: this._waveTitle,
          alpha: 1,
          yoyo: true,
          repeat: -1,
          onComplete: () => {
            this._gamePlay.tweens.add({
              targets: this._wave,
              alpha: 0,
              duration: 500,
              completeDelay: 1000,
              onComplete: () => {}
            });
          }
        });
      }
    });
  }

  private winSequence() {
    this._isPaused = true;
    this._gamePlay.winGame();
    this._carTween.stop();
  }

  private gameOverSequence() {
    this._isPaused = true;
    this._gamePlay.endGame();
    this._carTween.stop();
    this._gamePlay._player.stopDrive();
  }

  private pauseGame() {
    this.game.scene.pause("Game");
    this.game.scene.pause("GameScroll");
    this._isPaused = true;
  }
  private resumeGame() {
    this.game.scene.resume("Game");
    this.game.scene.resume("GameScroll");
    this._isPaused = false;
  }

  private updateScore(parameters: Array<any>): void {
    this._cafoni++;
    this._scoreValue += parameters[0];
    this._scoreText.setText(this._scoreValue + "");

    this.registry.set("score", this._scoreValue);
    this.registry.set("cafoni", this._cafoni);
  }

  private updateEnergy(parameters: Array<any>): void {
    //this._energybarmask.x -= parameters[0];
    this._damage += parameters[0];
    if (this._damage >= 700) {
      this.tweens.add({
        targets: this._energybarmask,
        x: -100,
        duration: 100,
        onComplete: () => {
          this.gameOverSequence();
        }
      });
    } else {
      this.tweens.add({
        targets: this._energybarmask,
        x: "-=" + parameters[0],
        duration: 100
      });
    }
  }
}
