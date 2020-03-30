import { leaderboard } from "../InitGame";
export default class Intro extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Image;
  private _bg: Phaser.GameObjects.TileSprite;
  private _introText: Phaser.GameObjects.BitmapText;
  private _deluca: Phaser.GameObjects.Image;
  private _covid19: Phaser.GameObjects.Image;
  private _vs: Phaser.GameObjects.Image;
  private _music: Phaser.Sound.BaseSound;
  private _governorText: Phaser.GameObjects.Text;
  private _covidText: Phaser.GameObjects.Text;
  private _status: number;
  private _highscores: Array<any>;
  private _highscoresText: Array<Phaser.GameObjects.BitmapText>;
  private _howtoplay: Phaser.GameObjects.Image;
  private _credits: Phaser.GameObjects.Image;
  private _protezione: Phaser.GameObjects.Image;
  private _quarantine: Phaser.GameObjects.Text;
  private _quarantineSubtitle: Phaser.GameObjects.Text;
  private _highscoresColors: Array<number> = [
    0xff0000,
    0xffff00,
    0x00ff00,
    0x00bfff,
    0xff8200
  ];
  constructor() {
    super({
      key: "Intro"
    });
  }

  create() {
    this._highscores = [];
    if (leaderboard != undefined) {
      this._highscores = leaderboard.getHighscores();
    }

    this._status = 0;

    this.add
      .tileSprite(0, 0, 1280, 800, "sky")
      .setScale(4)
      .setOrigin(0);

    this._bg = this.add
      .tileSprite(0, 0, 1280, 800, "bg")
      .setScale(4)
      .setOrigin(0);

    console.log("create intro");
    this._highscoresText = [];
    this._highscoresText.push(
      this.add.bitmapText(550, 250, "arcade", "Top Scorers").setAlpha(0)
    );

    this._howtoplay = this.add
      .image(0, 0, "howtoplay")
      .setDepth(1000)
      .setOrigin(0)
      .setAlpha(0)
      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          localX: number,
          localY: number,
          e: Phaser.Types.Input.EventData
        ) => {
          this.tweens.add({
            targets: this._howtoplay,
            alpha: 0,
            duration: 300,
            onComplete: () => {
              this._howtoplay.setInteractive();
            }
          });
          e.stopPropagation();
        }
      );

    this._quarantine = this.add
      .text(640, 0, "THE WRONG DIRECTION", {})
      .setOrigin(0.5)
      .setTint(0xffffff)
      .setAlpha(0)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(60);

    this._quarantineSubtitle = this.add
      .text(640, 210, "CODID-19 EDITION", {})
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setAlpha(0)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(30);

    this._credits = this.add
      .image(0, 0, "credits")
      .setDepth(1000)
      .setOrigin(0)
      .setAlpha(0)
      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          localX: number,
          localY: number,
          e: Phaser.Types.Input.EventData
        ) => {
          this.tweens.add({
            targets: [this._credits, this._protezione],
            alpha: 0,
            duration: 300,
            onComplete: () => {
              this._credits.setInteractive();
              this._protezione.setInteractive();
            }
          });
          e.stopPropagation();
        }
      );

    this._protezione = this.add
      .image(640, 300, "protezione-civile")
      .setDepth(1000)
      .setScale(0.5)
      .setOrigin(0.5)
      .setAlpha(0)
      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          localX: number,
          localY: number,
          e: Phaser.Types.Input.EventData
        ) => {
          let win = window.open(
            "http://www.protezionecivile.gov.it/",
            "_blank"
          );
          if (win != undefined) win.focus();
          e.stopPropagation();
        }
      );

    if (this._highscores.length > 0) {
      for (let i = 0; i < 5; i++) {
        this._highscoresText.push(
          this.add
            .bitmapText(
              550,
              320 + i * 70,
              "arcade",
              i +
                1 +
                "ND " +
                this.fixScore(this._highscores[i].score) +
                "  " +
                this._highscores[i].name
            )
            .setTint(this._highscoresColors[i])
            .setOrigin(0)
            .setAlpha(0)
        );
      }
    }

    this._deluca = this.add
      .image(-200, 800, "delucapixelated")
      .setOrigin(0, 1)
      .setScale(1.5)
      .setAlpha(0);

    this._covid19 = this.add
      .image(1300, 700, "covid19")
      .setOrigin(0, 1)
      .setScale(2)
      .setAlpha(0);

    this._vs = this.add
      .image(640, 600, "vs")
      .setOrigin(0.5)
      .setScale(1)
      .setAlpha(1);

    this._governorText = this.add
      .text(400, 600, "THE\nGOVERNOR", {})
      .setTint(0xff8200)
      .setOrigin(0.5)
      .setAlpha(1)
      .setStroke("#000000", 10)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(40);

    this._covidText = this.add
      .text(850, 600, "COVID-19", {})
      .setTint(0xff8200)
      .setOrigin(0.5)
      .setAlpha(1)
      .setStroke("#000000", 10)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(40);

    this.tweens.add({
      targets: this._covid19,
      props: {
        scaleX: { value: 1.2, duration: 1000 },
        scaleY: { value: 1.4, duration: 1500 },
        angle: { value: -10, duration: 4000, delay: 250 },
        y: { value: "+=20", duration: 1000 }
      },
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true
    });

    this._introText = this.add
      .bitmapText(640, 400, "carrier", "Start Game")
      .setTint(0xff8200)
      .setOrigin(0.5)
      .setAlpha(0)
      .setFontSize(30);

    this.add
      .bitmapText(1240, 780, "carrier", "CREDITS")
      .setOrigin(1)
      .setTint(0xffffff)
      .setFontSize(20)
      .setInteractive()
      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          localX: number,
          localY: number,
          e: Phaser.Types.Input.EventData
        ) => {
          this._credits.setInteractive();
          this._protezione.setInteractive({
            cursor: "url(assets/images/game/beer.cur), pointer"
          });
          this.tweens.add({
            targets: [this._credits, this._protezione],
            alpha: 1,
            duration: 300
          });
          e.stopPropagation();
        }
      );

    this.add
      .bitmapText(1000, 780, "carrier", "HOW TO PLAY")
      .setOrigin(1)
      .setTint(0xffffff)
      .setFontSize(20)
      .setInteractive()
      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          localX: number,
          localY: number,
          e: Phaser.Types.Input.EventData
        ) => {
          this._howtoplay.setInteractive();
          this.tweens.add({
            targets: this._howtoplay,
            alpha: 1,
            duration: 300
          });

          e.stopPropagation();
        }
      );

    this.input.once("pointerdown", () => {
      //this.sound.add("shot").play({ volume: 0.5 });
      this._music.stop();
      this.scene.stop("Intro");
      this.scene.start("GameScroll");
      this.scene.start("Game");
      this.scene.start("Hud");
      this.scene.bringToTop("GameScroll");
      this.scene.bringToTop("Game");
      this.scene.bringToTop("Hud");
    });

    this._music = this.sound.add("intro");
    this._music.play(undefined, {
      loop: true,
      volume: 0.2
    });
    this.introAnimStart();
  }

  fixScore(score: number) {
    if ((score + "").length == 1) return score + "    ";
    if ((score + "").length == 2) return score + "   ";
    if ((score + "").length == 3) return score + "  ";
    if ((score + "").length == 4) return score + " ";
    if ((score + "").length == 5) return score + "";
    if ((score + "").length == 6) return score + "";
  }

  startChange() {
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        if (this._status == 2) this._status = 0;
        switch (this._status) {
          case 0:
            this.introAnimOut();
            this._status += 1;
            break;
          case 1:
            this.highscoresOut();
            this._status += 1;
            break;
        }
        console.log("change status");
      },
      callbackScope: this,
      loop: true
    });
  }

  introAnimStart() {
    this.tweens.add({
      targets: this._deluca,
      alpha: 1,
      x: -40,
      duration: 1000,
      delay: 500,
      onComplete: () => {
        this.sound.add("ci-vuole-stomaco").play({ volume: 0.5 });
      },
      ease: "Sine.easeOut"
    });

    this.tweens.add({
      targets: this._covid19,
      alpha: 1,
      x: 980,
      duration: 1000,
      delay: 500,
      ease: "Sine.easeOut"
    });

    this.tweens.add({
      targets: this._quarantine,
      y: 150,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this.tweens.add({
          targets: this._quarantineSubtitle,
          alpha: 1,
          duration: 500,
          ease: "Sine.easeOut"
        });
      },
      ease: "Sine.easeOut"
    });

    //this.startChange();

    this.tweens.add({
      targets: this._introText,
      alpha: 1,
      yoyo: true,
      repeat: -1,
      onComplete: () => {}
    });
  }

  introAnimIn() {
    this._introText.setY(400);
  }

  introAnimOut() {
    this.highscoresIn();

    this._introText.setY(-100);
  }

  highscoresIn() {
    this.tweens.add({
      targets: this._highscoresText,
      duration: 500,
      alpha: 1,

      delay: (
        target: any,
        targetKey: any,
        value: any,
        targetIndex: any,
        totalTargets: any,
        tween: any
      ) => {
        return targetIndex * 100;
      }
    });
  }

  highscoresOut() {
    this.tweens.add({
      targets: this._highscoresText,
      duration: 500,
      alpha: 0,

      onComplete: () => {
        this.introAnimIn();
      }
    });
  }

  update(time: number, delta: number) {
    this._bg.tilePositionX += 0.05;
  }
}
