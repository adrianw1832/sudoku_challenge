$(document).ready(function() {
  var sudoku = new Sudoku();
  var startTime, endTime, timeTaken;


  $('#start_game_button').click(function() {
    window.location.assign('http://127.0.0.1:9292/game');
  });

  $('.buttons.finish_game').one("click", function() {
    if (sudoku.isGameFinished()) {
      endTime = new Date();
      sendResult();
      setTimeout(function () {
        window.location.assign('http://127.0.0.1:9292/results');
      }, 1000 );
    }
  });

  var sendResult = function() {
    timeTaken = (endTime - startTime) / 1000;
    $.post('http://127.0.0.1:9292/results', { seconds: timeTaken });
  };

  var buildGUI = function() {
    var row, cell, input, sectionRowID, sectionColID;
    for (var rowID = 0; rowID < sudoku.defaultGridSize; rowID++) {
      row = $('<tr>');
      $('#sudoku').append(row);
      for (var colID = 0; colID < sudoku.defaultGridSize; colID++) {
        cell = $('<td>');
        input = ($('<input>').attr('maxlength', 1)
          .on('keyup', $.proxy(findDetails, this))
          .data('row', rowID)
          .data('col', colID)
        );
        sectionRowID = Math.floor(rowID / 3);
        sectionColID = Math.floor(colID / 3);
        if ((sectionRowID + sectionColID) % 2 === 0) input.addClass('alternate');
        cell.append(input);
        row.append(cell);
      }
    }
  };

  var findDetails = function(cell) {
    var value = $(cell.currentTarget).val();
    var rowID = $(cell.currentTarget).data().row;
    var colID = $(cell.currentTarget).data().col;
    sudoku.insertEntry(rowID, colID, value);
  };

  $('.buttons.generate_sudoku').click(function() {
    $('.buttons.generate_sudoku').hide();
    $('.buttons.auto_solve').hide();
    $('.buttons.finish_game').show();
    startTime = new Date();
    sudoku.runSolver(0, 0);
    sudoku.randomlyRemoveNumberOfCells(50);
    printSudokuToScreen();
  });

  $('.buttons.auto_solve').click(function() {
    $('.buttons').hide();
    startTime = new Date();
    sudoku.runSolver(0, 0);
    endTime = new Date();
    timeTaken = (endTime - startTime) / 1000;
    printSudokuToScreen();
    alert('The algorithm solved the sudoku in ' + timeTaken + ' seconds in ' + sudoku.recursionCounter + ' recursion steps.');
  });

  $('.buttons.auto_fill').click(function() {
    sudoku.runSolver(0, 0);
    $('.buttons.finish_game').show();
  });

  var printSudokuToScreen = function() {
    var rowID, colID, value;
    for (counter = 0; counter < 81; counter++) {
      rowID = Math.floor(counter / 9);
      colID = counter % 9;
      value = sudoku.validationArrays.row[rowID][colID];
      $('#sudoku tr input').eq(counter).val(value);
    }
  };

  buildGUI();
  $('.buttons.finish_game').hide();
});
