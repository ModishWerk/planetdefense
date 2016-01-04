
MyGame.PlayingState = function (game) {
  this.background = null;
};

MyGame.PlayingState.prototype = {
  /* this == game*/

  init: function () {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  },

  preload: function () {
    this.stage.backgroundColor = '#324234';
    // game.load.image('sky', 'assets/img/spaceshooter/Backgrounds/purple.png');
    // game.load.atlasXML('spaceshooter', 'assets/img/spaceshooter/Spritesheet/sheet.png', 'client/assets/img/spaceshooter/Spritesheet/sheet.xml')
    //
  },

  create: function () {
    this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight ,'background');
    console.log(Phaser.Physics.ARCADE);
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.world.setBounds(0, 0, 1920, 1200);

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.defaultRestitution = 0.8;

    // this.background = this.add.tileSprite(0, 0, 800, 600, 'stars');
    this.background.fixedToCamera = true;

    ship = this.add.sprite(200, 200, 'ship');

    this.physics.p2.enable(ship);

    this.camera.follow(ship);

    cursors = this.input.keyboard.createCursorKeys();

  },

  update: function () {
    // this.background.tilePosition.y += 2;

    if (cursors.left.isDown)
    {
        ship.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        ship.body.rotateRight(100);
    }
    else
    {
        ship.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        ship.body.thrust(400);
    }
    else if (cursors.down.isDown)
    {
        ship.body.reverse(400);
    }

    if (!this.camera.atLimit.x)
    {
        this.background.tilePosition.x -= (ship.body.velocity.x * this.time.physicsElapsed);
    }

    if (!this.camera.atLimit.y)
    {
        this.background.tilePosition.y -= (ship.body.velocity.y * this.time.physicsElapsed);
    }
  },

  resize: function (width, height) {
    console.log(width, height);
    this.background.width = window.innerWidth;
    this.background.height = window.innerHeight;
    // this.sprite.x = this.world.centerX;
    // this.sprite.y = this.world.centerY;
    // this.logo.x = width;
    // this.logo.y = height;
  }

};
