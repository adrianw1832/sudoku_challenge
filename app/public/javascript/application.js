$(document).ready(function() {

    $('input#start_game_button').click(function() {
      window.location.assign('http://127.0.0.1:9292/game');
    });

    $('input#finish_game').click(function() {
      window.location.assign('http://127.0.0.1:9292/results');
    });
})

