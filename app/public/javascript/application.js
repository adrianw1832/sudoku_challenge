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
      setTimeout(function () {
      window.location.assign('http://127.0.0.1:9292/results');
    }, 1000 );
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
    var input;
    for (var i = 0; i < sudoku.defaultGridSize; i++) {
      row = $('<tr>');
      $('#container').append(row);
      for (var j = 0; j < sudoku.defaultGridSize; j++) {
        cell = $('<td>');
        input = ($('<input>').attr('maxlength', 1)
          .on('keyup', $.proxy(findDetails, this))
          .data('row', i)
          .data('col', j)
        );
        var sectionRowID = Math.floor(i / 3);
        var sectionColID = Math.floor(j / 3);
        if ((sectionRowID + sectionColID) % 2 === 0) input.addClass('alternate');
        cell.append(input);
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

  $('input#autofill').click(function() {
    var calculateEveryThirdRow = function(i, j) {
      return ((Math.floor(i / 3) + j + 1) % sudoku.defaultGridSize) === 0 ? 9 : ((Math.floor(i / 3) + j + 1) % sudoku.defaultGridSize);
    };

    var calculateOtherRows = function(i, j) {
      return ((Math.floor(i / 3) + j + 1 + 3 * (i % 3)) % sudoku.defaultGridSize) === 0 ? 9 : ((Math.floor(i / 3) + j + 1 + 3 * (i % 3)) % sudoku.defaultGridSize);
    };

    for (i = 0; i < sudoku.defaultGridSize; i++) {
      for (j = 0; j < sudoku.defaultGridSize; j++) {
        if (i % 3 === 0) {
          sudoku.insert(i, j, calculateEveryThirdRow(i, j));
        } else {
          sudoku.insert(i, j, calculateOtherRows(i, j));
        }
      }
    }
  });
});
