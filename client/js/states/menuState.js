MyGame.MenuState = function (game) {};

MyGame.MenuState.prototype = {
  preload: function () {
    this.load.image('background', '../assets/img/spaceshooter/Backgrounds/purple.png');
    this.load.image('bullet', 'assets/img/bullet.png');
    // this.load.image('bullet', '../assets/img/spaceshooter/PNG/ufoYellow.png');
    this.load.image('ship', 'assets/img/thrust_ship2.png');
  },

  create: function () {
    console.log("menuState - creating...")
    this.state.start('PlayingState');
  }
};
