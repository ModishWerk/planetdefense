//  var gameProperties = {
//     screenWidth: 640,
//     screenHeight: 480,
// };

// var states = {
//     game: "game",
// };

// var graphicAssets = {
//     ship:{URL:'assets/img/ship.png', name:'ship'},
//     bullet:{URL:'assets/img/bullet.png', name:'bullet'},

//     asteroidLarge:{URL:'assets/asteroidLarge.png', name:'asteroidLarge'},
//     asteroidMedium:{URL:'assets/asteroidMedium.png', name:'asteroidMedium'},
//     asteroidSmall:{URL:'assets/asteroidSmall.png', name:'asteroidSmall'},
// };

// var shipProperties = {
//     startX: gameProperties.screenWidth * 0.5,
//     startY: gameProperties.screenHeight * 0.5,
//     acceleration: 300,
//     drag: 100,
//     maxVelocity: 300,
//     angularVelocity: 200,
// };

// var bulletProperties = {
//     speed: 400,
//     interval: 250,
//     lifeSpan: 2000,
//     maxCount: 30,
// }

// MyGame.PlayingState = function (game) {
//   // this.background = null;
//     this.shipSprite;

//     this.key_left;
//     this.key_right;
//     this.key_thrust;
//     this.key_fire;

//     this.bulletGroup;
//     this.bulletInterval = 0;
// };

// MyGame.PlayingState.prototype  = {

//     preload: function () {
//         // game.load.image(graphicAssets.asteroidLarge.name, graphicAssets.asteroidLarge.URL);
//         // game.load.image(graphicAssets.asteroidMedium.name, graphicAssets.asteroidMedium.URL);
//         // game.load.image(graphicAssets.asteroidSmall.name, graphicAssets.asteroidSmall.URL);

//         this.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
//         // this.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
//     },

//     create: function () {
//         this.initGraphics();
//         this.initPhysics();
//         this.initKeyboard();
//     },

//     update: function () {
//         this.checkPlayerInput();
//         this.checkBoundaries(this.shipSprite);
//         this.bulletGroup.forEachExists(this.checkBoundaries, this);
//     },

//     initGraphics: function () {
//         this.shipSprite = this.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
//         this.shipSprite.angle = 0;
//         this.shipSprite.anchor.set(0.5, 0.5);

//         this.bulletGroup = this.add.group();
//     },

//     initPhysics: function () {
//         this.physics.startSystem(Phaser.Physics.ARCADE);

//         this.physics.enable(this.shipSprite, Phaser.Physics.ARCADE);
//         this.shipSprite.body.drag.set(shipProperties.drag);
//         this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);

//         this.bulletGroup.enableBody = true;
//         this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
//         this.bulletGroup.createMultiple(bulletProperties.maxCount, graphicAssets.bullet.name);
//         this.bulletGroup.setAll('anchor.x', 0.5);
//         this.bulletGroup.setAll('anchor.y', 0.5);
//         this.bulletGroup.setAll('lifespan', bulletProperties.lifeSpan);
//     },

//     initKeyboard: function () {
//         this.key_left = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
//         this.key_right = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
//         this.key_thrust = this.input.keyboard.addKey(Phaser.Keyboard.UP);
//         this.key_fire = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//     },

//     checkPlayerInput: function () {
//         if (this.key_left.isDown) {
//             this.shipSprite.body.angularVelocity = -shipProperties.angularVelocity;
//         } else if (this.key_right.isDown) {
//             this.shipSprite.body.angularVelocity = shipProperties.angularVelocity;
//         } else {
//             this.shipSprite.body.angularVelocity = 0;
//         }

//         if (this.key_thrust.isDown) {
//             this.physics.arcade.accelerationFromRotation(this.shipSprite.rotation - 1.5, shipProperties.acceleration, this.shipSprite.body.acceleration);
//         } else {
//             this.shipSprite.body.acceleration.set(0);
//         }

//         if (this.key_fire.isDown) {
//             this.fire();
//         }
//     },

//     checkBoundaries: function (sprite) {
//         if (sprite.x < 0) {
//             sprite.x = this.width;
//         } else if (sprite.x > this.width) {
//             sprite.x = 0;
//         }

//         if (sprite.y < 0) {
//             sprite.y = this.height;
//         } else if (sprite.y > this.height) {
//             sprite.y = 0;
//         }
//     },

//     fire: function () {
//         if (this.time.now > this.bulletInterval) {
//             var bullet = this.bulletGroup.getFirstExists(false);

//             if (bullet) {
//                 var length = this.shipSprite.width * 0.5;
//                 var x = this.shipSprite.x //+ (Math.cos(this.shipSprite.rotation) * length);
//                 var y = this.shipSprite.y //+ (Math.sin(this.shipSprite.rotation) * length);

//                 bullet.reset(x, y);
//                 bullet.lifespan = bulletProperties.lifeSpan;
//                 // bullet.angle = this.shipSprite.angle - 90
//                 bullet.rotation = this.shipSprite.rotation;

//                 this.physics.arcade.velocityFromRotation(bullet.rotation - 1.5, bulletProperties.speed, bullet.body.velocity);
//                 this.bulletInterval = this.time.now + bulletProperties.interval;
//             }
//         }
//     },
//     render: function() {
//       if (this.shipSprite){
//         this.game.debug.body(this.shipSprite);
//         this.game.debug.spriteInfo(this.shipSprite, 32, 32);
//         this.game.debug.spriteInfo(this.bulletGroup.getFirstExists(false), 32, 150)
//       }
//     }
// };

MyGame.PlayingState = function (game) {
  // this.background = null;
    this.shipSprite;

    this.key_left;
    this.key_right;
    this.key_thrust;
    this.key_fire;

    this.bulletGroup;
    this.bulletInterval = 0;
};

MyGame.PlayingState.prototype  = {

  /* this == game*/

  init: function () {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.bulletGroup = this.add.group();
    this.bulletInterval = 0
  },

  preload: function () {
    this.stage.backgroundColor = '#324234';

    // game.load.atlasXML('spaceshooter', 'assets/img/spaceshooter/Spritesheet/sheet.png', 'client/assets/img/spaceshooter/Spritesheet/sheet.xml')
    //
  },

  create: function () {
    this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight ,'background');

    // this.physics.startSystem(Phaser.Physics.ARCADE);
        // game.physics.arcade.moveToPointer(ball, 100);
    console.log(bulletProperties)

    this.bulletGroup.enableBody = true;
    this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.bulletGroup.createMultiple(30, 'bullet');
    this.bulletGroup.setAll('anchor.x', 0.5);
    this.bulletGroup.setAll('anchor.y', 0.5);
    this.bulletGroup.setAll('lifespan', bulletProperties.lifeSpan);

    this.world.bringToTop(this.bulletGroup);

    this.world.setBounds(0, 0, 1920, 1200);

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.defaultRestitution = 0.8;

    this.background.fixedToCamera = true;

    ship = this.add.sprite(200, 200, 'ship');
    ship.angle = 0;

    this.physics.p2.enable(ship);

    this.camera.follow(ship);

    cursors = this.input.keyboard.createCursorKeys();
    key_fire = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  checkBoundaries: function (sprite) {
        if (sprite.x < 0) {
            sprite.x = this.width;
        } else if (sprite.x > this.width) {
            sprite.x = 0;
        }

        if (sprite.y < 0) {
            sprite.y = this.height;
        } else if (sprite.y > this.height) {
            sprite.y = 0;
        }
    },

  fire: function () {
        if (this.time.now > this.bulletInterval) {
            var bullet = this.bulletGroup.getFirstExists(false);

            if (bullet) {
                var length = ship.width * 0.5;
                var x = ship.x //+ (Math.cos(ship.rotation) * length);
                var y = ship.y //+ (Math.sin(ship.rotation) * length);
                console.log(length, x, y);
                bullet.reset(x, y);
                bullet.lifespan = bulletProperties.lifeSpan;
                bullet.rotation = ship.rotation - 1.5555;

                this.physics.arcade.velocityFromRotation(bullet.rotation, bulletProperties.speed, bullet.body.velocity);
                this.bulletInterval = this.time.now + bulletProperties.interval;
            }
        }
    },

  update: function () {

    if (cursors.left.isDown) {
        ship.body.rotateLeft(100);
    }
    else if (cursors.right.isDown) {
        ship.body.rotateRight(100);
    }
    else {
        ship.body.setZeroRotation();
    }

    if (cursors.up.isDown) {
        ship.body.thrust(400);
    }
    else if (cursors.down.isDown) {
        ship.body.reverse(400);
    }

    if (!this.camera.atLimit.x) {
        this.background.tilePosition.x -= (ship.body.velocity.x * this.time.physicsElapsed);
    }

    if (!this.camera.atLimit.y) {
        this.background.tilePosition.y -= (ship.body.velocity.y * this.time.physicsElapsed);
    }
   // if (key_fire.isDown) {
        // console.log("Firing")
        this.fire();
    // }
    // console.log(this)
  // this.bulletGroup.forEachExists(this.checkBoundaries, this);

  },

  resize: function (width, height) {
    console.log(width, height);
    // this.background.width = window.innerWidth;
    // this.background.height = window.innerHeight;
    // this.sprite.x = this.world.centerX;
    // this.sprite.y = this.world.centerY;
    // this.logo.x = width;
    // this.logo.y = height;
  }
};
