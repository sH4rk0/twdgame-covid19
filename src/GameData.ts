export let GameData: any = {
  levels: [
    {
      level: "GET READY!",
      title: "Kill all virus vectors",
      type: 0,
      asteroids: {
        quantity: 100,
        speed: { min: 70, max: 60 },
        spawn: { min: 3000, max: 4000 }
      }
    }
  ],
  tilemaps: [],
  spritesheets: [
    {
      name: "blocks",
      path: "assets/images/game/vehicles/blocks.png",
      width: 113,
      height: 100,
      frames: 8
    },

    {
      name: "bonus",
      path: "assets/images/game/bonus/bonus.png",
      width: 44,
      height: 60,
      frames: 48
    },
    {
      name: "blood",
      path: "assets/images/game/explosions/blood.png",
      width: 126,
      height: 126,
      frames: 8
    },
    {
      name: "explosion",
      path: "assets/images/game/explosions/explosion.png",
      width: 80,
      height: 119,
      frames: 19
    },
    {
      name: "bodyparts",
      path: "assets/images/game/explosions/bodyparts.png",
      width: 26,
      height: 18,
      frames: 4
    },
    {
      name: "blockparts",
      path: "assets/images/game/explosions/blockparts.png",
      width: 26,
      height: 26,
      frames: 4
    },

    {
      name: "playerSirena",
      path: "assets/images/game/player/playerSirena.png",
      width: 20,
      height: 23,
      frames: 4
    },
    {
      name: "playerDeluca",
      path: "assets/images/game/player/playerDeluca.png",
      width: 27,
      height: 26,
      frames: 6
    },
    {
      name: "playerCar",
      path: "assets/images/game/player/playerCar.png",
      width: 200,
      height: 100,
      frames: 2
    }
  ],

  atlas: [],

  images: [
    {
      name: "play-again",
      path: "assets/images/game/play-again.png"
    },
    {
      name: "protezione-civile",
      path: "assets/images/game/protezione-civile.png"
    },
    {
      name: "howtoplay",
      path: "assets/images/game/intro/howtoplay.png"
    },
    {
      name: "credits",
      path: "assets/images/game/intro/credits.png"
    },
    {
      name: "energyCar",
      path: "assets/images/game/energy/car.png"
    },
    {
      name: "logo",
      path: "assets/images/game/intro/logo.png"
    },

    {
      name: "goal",
      path: "assets/images/game/gameover/goal.png"
    },
    {
      name: "energyHud",
      path: "assets/images/game/energy/energy-layer1.png"
    },
    {
      name: "energyBar",
      path: "assets/images/game/energy/energy-layer2.png"
    },
    {
      name: "energyMask",
      path: "assets/images/game/energy/energy-layer-mask.png"
    },
    {
      name: "covid19",
      path: "assets/images/game/intro/covid19.png"
    },
    {
      name: "delucapixelated",
      path: "assets/images/game/intro/deluca-pixelated.png"
    },
    {
      name: "vs",
      path: "assets/images/game/intro/vs.png"
    },

    {
      name: "rocks",
      path: "assets/images/game/rocks.png"
    },

    {
      name: "street1",
      path: "assets/images/game/street1.png"
    },

    {
      name: "street2",
      path: "assets/images/game/street2.png"
    },

    {
      name: "deluca-rebocop",
      path: "assets/images/game/gameover/deluca-robocop.png"
    },

    {
      name: "street3",
      path: "assets/images/game/street3.png"
    },

    {
      name: "street4",
      path: "assets/images/game/street4.png"
    },

    {
      name: "playerWheel",
      path: "assets/images/game/player/playerWheel.png"
    },

    {
      name: "playerEmpty",
      path: "assets/images/game/player/playerEmpty.png"
    },

    {
      name: "rub",
      path: "assets/images/game/gameover/rub.png"
    },
    {
      name: "end",
      path: "assets/images/game/gameover/end.png"
    },
    {
      name: "block",
      path: "assets/images/game/gameover/block.png"
    },
    {
      name: "bg",
      path: "assets/images/game/menu/bg.png"
    },
    {
      name: "sky",
      path: "assets/images/game/menu/sky.png"
    },
    {
      name: "empty",
      path: "assets/images/game/empty.png"
    }
  ],

  sounds: [
    {
      name: "intro",
      paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "explosion",
      paths: ["assets/sounds/explosion.ogg", "assets/sounds/explosion.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "game",
      paths: ["assets/sounds/game.ogg", "assets/sounds/game.m4a"],
      volume: 1,
      loop: false
    },

    {
      name: "cafone-motorizzato",
      paths: [
        "assets/sounds/cafone-motorizzato.ogg",
        "assets/sounds/cafone-motorizzato.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "cafone",
      paths: ["assets/sounds/cafone.ogg", "assets/sounds/cafone.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "bestia",
      paths: ["assets/sounds/bestia.ogg", "assets/sounds/bestia.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "cafoni-zero",
      paths: ["assets/sounds/cafoni-zero.ogg", "assets/sounds/cafoni-zero.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "imbecille",
      paths: ["assets/sounds/imbecille.ogg", "assets/sounds/imbecille.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "poffete",
      paths: ["assets/sounds/poffete.ogg", "assets/sounds/poffete.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "vietato-passeggiare",
      paths: [
        "assets/sounds/vietato-passeggiare.ogg",
        "assets/sounds/vietato-passeggiare.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "passibile-sanzioni",
      paths: [
        "assets/sounds/passibile-sanzioni.ogg",
        "assets/sounds/passibile-sanzioni.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "ci-vuole-stomaco",
      paths: [
        "assets/sounds/ci-vuole-stomaco.ogg",
        "assets/sounds/ci-vuole-stomaco.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "incredibile",
      paths: ["assets/sounds/incredibile.ogg", "assets/sounds/incredibile.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "vietato-camminare-per-strada",
      paths: [
        "assets/sounds/vietato-camminare-per-strada.ogg",
        "assets/sounds/vietato-camminare-per-strada.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "chebello",
      paths: ["assets/sounds/chebello.ogg", "assets/sounds/chebello.m4a"],
      volume: 1,
      loop: false
    },

    {
      name: "cafone-numero-uno",
      paths: [
        "assets/sounds/cafone-numero-uno.ogg",
        "assets/sounds/cafone-numero-uno.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "lieto-ospedale",
      paths: [
        "assets/sounds/lieto-ospedale.ogg",
        "assets/sounds/lieto-ospedale.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "quarantena-15-giorni",
      paths: [
        "assets/sounds/quarantena-15-giorni.ogg",
        "assets/sounds/quarantena-15-giorni.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "carabinieri-lanciafiamme",
      paths: [
        "assets/sounds/carabinieri-lanciafiamme.ogg",
        "assets/sounds/carabinieri-lanciafiamme.m4a"
      ],
      volume: 1,
      loop: false
    },

    {
      name: "neutralizzati",
      paths: [
        "assets/sounds/neutralizzati.ogg",
        "assets/sounds/neutralizzati.m4a"
      ],
      volume: 1,
      loop: false
    },

    {
      name: "webmaster",
      paths: ["assets/sounds/webmaster.ogg", "assets/sounds/webmaster.m4a"],
      volume: 1,
      loop: false
    },

    {
      name: "uomo-di-neanderthal",
      paths: [
        "assets/sounds/uomo-di-neanderthal.ogg",
        "assets/sounds/uomo-di-neanderthal.m4a"
      ],
      volume: 1,
      loop: false
    },
    {
      name: "win",
      paths: ["assets/sounds/win.ogg", "assets/sounds/win.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "gameover",
      paths: ["assets/sounds/gameover.ogg", "assets/sounds/gameover.m4a"],
      volume: 1,
      loop: false
    }
  ],

  audio: [
    /*{
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.mp3"],
      instances: 4
    }*/
  ],

  script: [
    {
      key: "webfont",
      path: "assets/js/webfonts.js"
    }
  ],

  bitmapfont: [
    {
      name: "carrier",
      imgpath: "assets/fonts/carrier_command.png",
      xmlpath: "assets/fonts/carrier_command.xml"
    },
    {
      name: "arcade",
      imgpath: "assets/fonts/arcade.png",
      xmlpath: "assets/fonts/arcade.xml"
    }
  ]
};
