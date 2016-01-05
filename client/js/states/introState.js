var MyGame = {};

MyGame.IntroState = function (game) {
  this.loadingIndicator = null;
  this.loadingText = null;
};

MyGame.IntroState.prototype = {
  init: function () {
    var style = {
      font: "32px Arial", fill: "#ffffff", align: "center"
    };
    this.loadingText = this.add.text(400, 300, "Loading: 0%", style);
    this.loadingText.anchor.x = 0.5;
  },

  preload: function () {
    this.load.image('background', '../assets/img/spaceshooter/Backgrounds/purple.png');

    // this.load.audio('blaster', 'assets/audio/blaster.mp3');

    this.load.onFileComplete.add(this.fileLoaded, this);
  },

  fileLoaded: function (progress) {
  this.loadingText.text = "Loading: " + progress + "%";
  },

  create: function () {
    this.add.tween(this.loadingText).to({ alpha: 0 }, 1000, "Linear", true)
    this.state.start('MenuState');
  }
};
