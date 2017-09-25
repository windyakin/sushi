enchant();

window.onload = function() {
  var game = new Core(1280, 720);

  //ゲーム素材読み込み
  game.preload(
    "img/sushi.png",
  );

  // 床の生成クラス
  var Floor = Class.create(PhyBoxSprite, {
    initialize: function(x, y) {
      PhyBoxSprite.call(this, 16, 16, enchant.box2d.STATIC_SPRITE, 0, 1.0, 0, false);
      this.x = x;
      this.y = y;
      game.rootScene.addChild(this);
    }
  });

  // 寿司の生成クラス
  var Sushi = Class.create(PhyCircleSprite, {
    initialize: function(x, y) {
      PhyCircleSprite.call(this, 32, enchant.box2d.DYNAMIC_SPRITE, 1.5, 1.0, 0.3, true);
      this.image = game.assets["img/sushi.png"];
      this.frame = 22;
      this.x = x;
      this.y = y;
      game.rootScene.addChild(this);
      this.ontouchstart = function() {
        this.applyImpulse(new b2Vec2(4, -1.5));
      }
    }
  });


  //メインループ
  game.onload = function() {
    var world = new PhysicsWorld(0, 9.8);

    game.keybind('Z'.charCodeAt(0), 's');

    //床の作成
    for (var i = 0; i < 1280; i += 16) {
      new Floor(i, 720);
    }

    new Sushi(Math.random() * 1280, Math.random() * 200 - 800);

    //物理エンジン処理
    game.rootScene.onenterframe = () => {
      world.step(game.fps);
    }

    game.rootScene.addEventListener('sbuttondown', function () {
      var x = Math.random() * 1280;
      for(var i = 0; i < 5; i++) {
        new Sushi(x + 10 * i, Math.random() * 600 - 800);
      }
    });
  }

  game.start();

}
