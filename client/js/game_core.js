
requirejs.config({
    baseUrl: './js',
    paths: {
        app: '../client'
    }
});

require([
          './states/introState',
          './states/menuState',
          './states/playingState',
          './entities/bullet',
          // './entities/bullet',
        ], function () {

});

function startCore (argument) {

  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameAreaWrapper');

  game.state.add('IntroState', MyGame.IntroState);
  game.state.add('MenuState', MyGame.MenuState);
  game.state.add('PlayingState', MyGame.PlayingState);
  game.state.start('IntroState');

  return game;
}
