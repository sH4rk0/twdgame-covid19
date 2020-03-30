import * as firebase from "firebase";

export default class Leaderboard {
  private firebaseConfig = {
    apiKey: "AIzaSyDIP5L2nOmAhJS-7vdbYzq06f43NI_sTnU",
    authDomain: "twd-game.firebaseapp.com",
    databaseURL: "https://twd-game.firebaseio.com",
    projectId: "twd-game",
    storageBucket: "twd-game.appspot.com",
    messagingSenderId: "224227027092",
    appId: "1:224227027092:web:342a9e99c36fc7434c6c81",
    measurementId: "G-HY759P9T0C"
  };

  private fireBaseApp: firebase.app.App;
  private fireBaseDb: firebase.database.Database;
  private scores: firebase.database.Reference;
  private highscores: Array<any>;
  private allscores: Array<any>;

  constructor() {
    try {
      this.fireBaseApp = firebase.initializeApp(this.firebaseConfig);
      this.fireBaseDb = this.fireBaseApp.database();
      this.scores = this.fireBaseDb.ref("scores");
      this.highscores = [];
      this.allscores = [];
      this.getData();
    } catch (err) {}
  }

  insertScore(score: ScoreConfig) {
    this.scores.push(score);
  }

  getHighscores() {
    return this.highscores;
  }

  getData() {
    this.scores.on("value", data => {
      //console.log(data.val());
      this.allscores = [];
      Object.entries(data.val()).forEach(entry => {
        let key = entry[0];
        let value = entry[1];
        this.allscores.push(value);
      });

      this.allscores.sort((a: any, b: any) => {
        const valueA = a.score;
        const valueB = b.score;

        let comparison = 0;
        if (valueA < valueB) {
          comparison = 1;
        } else if (valueA > valueB) {
          comparison = -1;
        }
        return comparison;
      });

      if (this.allscores.length > 0) {
        this.highscores = [];
        for (let i = 0; i < 5; i++) {
          this.highscores.push(this.allscores[i]);
        }
      }

      console.log(this.highscores);
    });
  }
}
