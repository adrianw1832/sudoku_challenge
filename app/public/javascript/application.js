$(document).ready(function() {
  var sudoku = new Sudoku();
  var startTime, endTime, timeTaken;

  $('#start_game_button').click(function() {
    window.location.assign('http://127.0.0.1:9292/game');
  });

  $('.buttons.finish_game').one("click", function() {
    if (sudoku.isGameFinished()) {
      endTime = new Date();
      timeTaken = (endTime - startTime) / 1000;
      $.post('http://127.0.0.1:9292/results', { seconds: timeTaken });
      setTimeout(function () {
        window.location.assign('http://127.0.0.1:9292/results');
      }, 1000 );
    }
  });

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

  sudoku.buildGUI();
  $('.buttons.finish_game').hide();
});
