$(document).ready(function() {

    var redirectToGame = function () {
      $('input#start_game_button').click(function() {
        alert('here')
        window.location.assign('http://127.0.0.1:9292/game');
      });
    };

    var redirectToResults = function () {
      $('input#finish_game').click(function() {
        window.location.assign('http://127.0.0.1:9292/results');
      });
    };

});
