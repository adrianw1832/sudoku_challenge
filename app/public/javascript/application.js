$(document).ready(function() {
  var sudoku = new Sudoku();
  var startTime = new Date();

  $('input#start_game_button').click(function() {
    window.location.assign('http://127.0.0.1:9292/game');
  });

  $('input#finish_game').click(function() {
    if (sudoku.isGameFinished()) {
      var endTime = new Date();
      var time = (endTime - startTime) / 1000;
      sendResult(time);
      window.location.assign('http://127.0.0.1:9292/results');
    }
  });

  var sendResult = function(time) {
    $.post('http://127.0.0.1:9292/results', {
      seconds: time
    });
  };

  var buildGUI = function() {
    var row;
    var cell;
    for (var i = 0; i < sudoku.defaultGridSize; i++) {
      row = $('<tr>');
      $('#container').append(row);
      for (var j = 0; j < sudoku.defaultGridSize; j++) {
        cell = $('<td>');
        cell.append($('<input>').attr('maxlength', 1)
          .on('keyup', $.proxy(findDetails, this))
          .data('row', i)
          .data('col', j)
        );
        row.append(cell);
      }
    }
  };

  var findDetails = function(cell) {
    var value = $(cell.currentTarget).val();
    var xCoordinate = $(cell.currentTarget).data().row;
    var yCoordinate = $(cell.currentTarget).data().col;
    sudoku.insert(xCoordinate, yCoordinate, value);
  };

  buildGUI();
});
