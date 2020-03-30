import Player from "../gameObjects/Player";
import EnemyGeneric from "../gameObjects/EnemyGeneric";
import BonusGeneric from "../gameObjects/BonusGeneric";
import Explosion from "../gameObjects/Explosion";
import Goal from "../gameObjects/Goal";
import GameScroll from "../scenes/GameScroll";

export default class Game extends Phaser.Scene {
  private _isGameOver: boolean = false;
  private _isStarted: boolean = false;
  public _player: Player;
  public _playerContainer: Phaser.GameObjects.Container;
  private _music: Phaser.Sound.BaseSound;
  private _enemyGroup: Phaser.GameObjects.Group;
  private _bonusGroup: Phaser.GameObjects.Group;
  private _tweenVelocity: Phaser.Tweens.Tween;
  private _progress: number;
  private _points: Array<boolean>;
  private _gameScroll: GameScroll;

  constructor() {
    super({
      key: "Game"
    });
  }

  create() {
    this._points = [false, false];
    this._progress = 0;
    this._isGameOver = false;
    this._isStarted = false;
    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._bonusGroup = this.add.group({ runChildUpdate: true });
    this._playerContainer = this.add.container(0, 0).setScale(0.75);
    this._player = new Player({ scene: this, x: 200, y: 50 });

    this.physics.add.collider(
      this._player.getHitArea(),
      this._enemyGroup,
      this.collideEnemy,
      undefined,
      this
    );

    this.physics.add.collider(
      this._player.getHitArea(),
      this._bonusGroup,
      this.collideBonus,
      undefined,
      this
    );

    this._music = this.sound.add("game");
    this._music.play(undefined, {
      loop: true,
      volume: 0.2
    });

    this._gameScroll = <GameScroll>this.scene.get("GameScroll");
  }

  collideBonus(_player: any, _bonus: any) {
    if (_player.depth == _bonus.depth) {
      _bonus.kill("");
      new Explosion({
        scene: this,
        key: "blood",
        x: _bonus.x,
        y: _bonus.y,
        options: { type: 0 }
      });
      this.events.emit("updateScore", [_bonus.getScore()]);
    }
  }

  collideEnemy(_player: any, _enemy: any) {
    if (_player.depth == _enemy.depth) {
      _enemy.kill();
      new Explosion({
        scene: this,
        key: "explosion",
        x: _enemy.x,
        y: _enemy.y,
        options: { type: 1 }
      });
      this.sound.add("explosion").play({ volume: 0.5 });

      if (!this._isGameOver) {
        this.time.addEvent({
          delay: 200,
          callback: () => {
            if (Phaser.Math.RND.integerInRange(0, 1)) {
              this.sound.add("imbecille").play({ volume: 2 });
            } else {
              this.sound.add("bestia").play({ volume: 1 });
            }
          }
        });

        this.events.emit("updateEnergy", [_enemy.getDamage()]);
      }
    }
  }

  createBlock() {
    if (
      this.getProgress() > 0.4 &&
      this.getProgress() < 0.5 &&
      !this._points[0]
    ) {
      //console.log("webmaster");
      this._points[0] = true;
      this._bonusGroup.add(
        new BonusGeneric({
          scene: this,
          key: "bonus",
          type: 0
        })
      );
    } else if (
      this.getProgress() > 0.7 &&
      this.getProgress() < 0.8 &&
      !this._points[1]
    ) {
      //console.log("neamderthal");
      this._points[1] = true;
      this._bonusGroup.add(
        new BonusGeneric({
          scene: this,
          key: "bonus",
          type: 1
        })
      );
    } else {
      if (Phaser.Math.RND.integerInRange(1, 100) > 70) {
        this._bonusGroup.add(
          new BonusGeneric({
            scene: this,
            key: "bonus",
            type: Phaser.Math.RND.integerInRange(2, 11)
          })
        );
      } else {
        this._enemyGroup.add(new EnemyGeneric({ scene: this, key: "blocks" }));
      }
    }
  }

  setProgress(_progress: number) {
    this._progress = _progress;
  }

  getProgress(): number {
    return parseFloat(this._progress.toFixed(2));
  }

  update(time: number, delta: number) {
    if (this._isStarted) {
      this._player.update(time, delta);

      this._gameScroll.updateData({
        isStarted: this._isStarted,
        tween: this.getTweenVelocity()
      });

      /* console.clear();
      console.log(
        this._enemyGroup.countActive(),
        this._enemyGroup.getTotalFree(),
        this._enemyGroup.getTotalUsed()
      );*/
    }
  }

  getTweenVelocity(): number {
    if (this._isStarted && !this._isGameOver) {
      return this._tweenVelocity.getValue() + this.getProgress();
    }

    return this._tweenVelocity.getValue();
  }

  startGame() {
    this._isStarted = true;
    this._tweenVelocity = this.tweens.addCounter({
      from: 0,
      to: 4,
      duration: 1500
    });

    this._player.drive();
  }

  endGame() {
    this._isGameOver = true;
    this._tweenVelocity = this.tweens.addCounter({
      from: 4,
      to: 0,
      duration: 1000,
      onComplete: () => {
        this._player.explode();
      }
    });
  }

  movePlayer(_direction: string) {
    this._player.move(_direction);
  }

  pauseMusic() {
    this._music.pause();
  }
  stopMusic() {
    this._music.stop();
  }
  resumeMusic() {
    this._music.resume();
  }

  winGame() {
    this._isGameOver = true;
    this._player.stopDrive();
    this._bonusGroup.add(new Goal({ scene: this, key: "goal" }));
    this._tweenVelocity = this.tweens.addCounter({
      from: 4,
      to: 0,
      duration: 2000,
      delay: 1000,
      onComplete: () => {
        this.registry.set("win", "win");
        this.goGameOver();
      }
    });
  }

  gameOver(): void {
    this.goGameOver();
  }

  goGameOver() {
    this.cameras.main.flash(
      2000,
      255,
      255,
      255,
      undefined,
      (camera: any, progress: number) => {
        if (progress == 1) {
          this.registry.set("win", "nowin");
          this.stopMusic();
          this.scene.stop("Hud");
          this.scene.stop("Game");
          this.scene.start("GameOver");
          this.scene.start("ScoreInput");
          this.scene.bringToTop("GameOver");
          this.scene.bringToTop("ScoreInput");
        }
      }
    );
  }
}
