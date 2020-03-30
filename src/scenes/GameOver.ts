import { leaderboard } from "../InitGame";

export default class GameOver extends Phaser.Scene {
  private _playerText: Phaser.GameObjects.BitmapText;
  private _deluca: Phaser.GameObjects.Image;
  private _win: string;
  private _score: number;
  private _cafoni: number;
  private _music: Phaser.Sound.BaseSound;
  private _insulti: Array<string> = [
    "Personaggetto!",
    "Cafone!",
    "Consumatore abusivo di ossigeno!",
    "Imbecille!",
    "Imbecille e cafone!",
    "Personaggetto col sorrisetto!",
    "Cialtrone!",
    "Affannato mentale!",
    "Cialtroneria pura!",
    "Ti devono ammazzare!",
    "Sei peggio di Travaglio!",
    "Sei come GIGGINO o webmaster!",
    "La Bindi ti fa un baffo!",
    "Sei il congiuntivo di\nDi Battista!"
  ];

  private _audio: Array<string> = [
    "cafoni-zero",
    "cafone-numero-uno",
    "vietato-passeggiare",
    "passibile-sanzioni",
    "vietato-camminare-per-strada",
    "lieto-ospedale",
    "quarantena-15-giorni",
    "carabinieri-lanciafiamme",
    "neutralizzati"
  ];

  constructor() {
    super({
      key: "GameOver"
    });
  }

  create() {
    this.add
      .tileSprite(0, 0, 1280, 800, "sky")
      .setScale(4)
      .setOrigin(0)
      .setScrollFactor(0);

    this.add
      .tileSprite(0, 800 - 77 - 53 - 32 - 56, 1280, 96, "rocks")
      .setOrigin(0, 1);
    this.add
      .tileSprite(0, 800 - 77 - 53 - 32, 1280, 109, "street1")
      .setOrigin(0, 1);
    this.add.tileSprite(0, 800 - 77 - 53, 1280, 32, "street2").setOrigin(0, 1);
    this.add.tileSprite(0, 800 - 77, 1280, 53, "street3").setOrigin(0, 1);
    this.add.tileSprite(0, 800, 1280, 77, "street4").setOrigin(0, 1);

    this.add
      .bitmapText(640, 25, "arcade", "SAVE YOUR SCORE")
      .setTint(0xff8200)
      .setOrigin(0.5);

    this.add
      .image(1100, 200, "play-again")
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.playAgain();
      });

    this._win = this.registry.get("win");
    if (this._win == undefined) this._win = "nowin";
    this._cafoni = this.registry.get("cafoni");
    if (this._cafoni == undefined) this._cafoni = 0;
    this._score = this.registry.get("score");
    if (this._score == undefined) this._score = 0;

    if (this._win == "nowin") {
      this._music = this.sound.add("gameover");
      this._music.play(undefined, {
        loop: true,
        volume: 0.07
      });
      this._deluca = this.add
        .image(-200, 800, "delucapixelated")
        .setOrigin(0, 1)
        .setScale(1.5)
        .setAlpha(0);

      this.add
        .text(20, 50, "GAME", {})
        .setTint(0xff8200)
        .setOrigin(0)
        .setAlpha(1)
        .setStroke("#000000", 10)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(80);

      this.add
        .text(1260, 50, "OVER", {})
        .setTint(0xff8200)
        .setOrigin(1, 0)
        .setAlpha(1)
        .setStroke("#000000", 10)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(80);

      let _audioIndex: number = 0;
      let _text: string = "";
      if (this._cafoni == 0) {
        _text = "Non hai arrotato nessun cafone!\n";
        _audioIndex = 0;
      } else if (this._cafoni == 1) {
        _text = "Hai arrotato un solo cafone!\n";
        _audioIndex = 1;
      } else {
        _text = "Hai arrotato solo " + this._cafoni + " cafoni!\n";
        _audioIndex = Phaser.Math.RND.integerInRange(2, 8);
      }

      this.add
        .text(260, 390, _text, {})
        .setTint(0xffffff)
        .setOrigin(0)
        .setAlpha(1)
        .setStroke("#000000", 10)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(30);

      this.tweens.add({
        targets: this._deluca,
        alpha: 1,
        x: -40,
        duration: 1000,
        delay: 500,
        ease: "Sine.easeOut",
        onComplete: () => {
          this.sound.add(this._audio[_audioIndex]).play({ volume: 0.4 });
        }
      });

      this.add
        .text(260, 440, Phaser.Math.RND.pick(this._insulti), {})
        .setTint(0xffffff)
        .setOrigin(0)
        .setAlpha(1)
        .setStroke("#000000", 10)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(30);
    } else {
      this._music = this.sound.add("win");
      this._music.play(undefined, {
        loop: true,
        volume: 0.07
      });
      this.add
        .text(20, 50, "YOU", {})
        .setTint(0xff8200)
        .setOrigin(0)
        .setAlpha(1)
        .setStroke("#000000", 10)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(80);

      this.add
        .text(1260, 50, "WIN", {})
        .setTint(0xff8200)
        .setOrigin(1, 0)
        .setAlpha(1)
        .setStroke("#000000", 10)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(80);

      this._deluca = this.add
        .image(-200, 800, "deluca-rebocop")
        .setOrigin(0, 1)
        .setScale(4)
        .setAlpha(0);

      let _audioIndex: number = 0;
      let _text: string = "";
      if (this._cafoni == 0) {
        _text = "Non hai arrotato nessun cafone!\n";
        _audioIndex = 0;
      } else if (this._cafoni == 1) {
        _text = "Hai arrotato un solo cafone!\n";
        _audioIndex = 1;
      } else {
        _text = "Hai arrotato solo " + this._cafoni + " cafoni!\n";
        _audioIndex = Phaser.Math.RND.integerInRange(2, 8);
      }
      this.add
        .text(260, 390, _text, {})
        .setTint(0xffffff)
        .setOrigin(0)
        .setAlpha(1)
        .setStroke("#000000", 10)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(30);

      this.tweens.add({
        targets: this._deluca,
        alpha: 1,
        x: 0,
        duration: 1000,
        delay: 500,
        ease: "Sine.easeOut",
        onComplete: () => {
          this.sound.add("chebello").play({ volume: 0.4 });
        }
      });

      let _delucop = this.add
        .text(750, 550, "DELUCOP COMING SOON!", {})
        .setTint(0xffffff)
        .setAlpha(0)
        .setOrigin(0.5)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(40);
      this.tweens.add({
        targets: _delucop,
        alpha: 1,
        delay: 1500
      });

      this.add
        .text(260, 440, "PERSONAGGIONE!!!!", {})
        .setTint(0xffffff)
        .setOrigin(0)
        .setAlpha(1)
        .setStroke("#000000", 10)
        .setFontFamily('"Press Start 2P"')
        .setFontSize(30);
    }

    this.add
      .text(
        780,
        670,
        "Fai una donazione\n alla protezione\n civile italiana",
        {}
      )
      .setTint(0xffffff)
      .setOrigin(0)
      .setAlpha(1)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(20);

    this.add
      .image(1200, 700, "protezione-civile")
      .setDepth(1000)
      .setScale(0.25)
      .setOrigin(0.5)
      .setInteractive({ cursor: "url(assets/images/game/beer.cur), pointer" })
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

    this.add
      .bitmapText(390, 240, "arcade", "SCORE   YOURNAME")
      .setTint(0xff00ff);

    this.add.bitmapText(390, 300, "arcade", "" + this._score).setTint(0xff0000);

    this._playerText = this.add
      .bitmapText(645, 300, "arcade", "")
      .setTint(0xff0000)
      .setText("");

    this.input.keyboard.enabled = false;
    let panel = this.scene.get("ScoreInput");
    this.scene.bringToTop("ScoreInput");

    panel.events.off("updateName", this.updateName, this);
    panel.events.off("submitName", this.submitName, this);
    panel.events.on("updateName", this.updateName, this);
    panel.events.on("submitName", this.submitName, this);

    /*this.input.keyboard.on("keydown-ONE", (event: Event) => {
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
    });*/
  }

  startGame(): void {
    this.scene.start("Intro");
  }

  updateName(name: string) {
    this._playerText.setText(name);
  }

  playAgain(): void {
    this._music.stop();
    this.scene.stop("GameOver");
    this.scene.stop("ScoreInput");
    this.scene.start("Game");
    this.scene.start("Hud");
    this.scene.bringToTop("Game");
    this.scene.bringToTop("Hud");
  }

  submitName(name: string) {
    this.scene.stop("ScoreInput");

    name = name
      .replace("<", "")
      .replace(">", "")
      .trim();
    if (leaderboard != undefined && name != undefined && name != "") {
      leaderboard.insertScore({
        score: this._score,
        cafoni: this._cafoni,
        name: name,
        date: Date.now()
      });
    }
    this.registry.set("win", false);
    this.registry.set("score", 0);
    this.registry.set("cafoni", 0);

    this._music.stop();
    this.scene.stop("GameOver");
    this.scene.stop("ScoreInput");
    this.scene.start("Intro");
    this.scene.bringToTop("Intro");
  }
}
