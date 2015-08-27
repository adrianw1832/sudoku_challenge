$(document).ready(function() {
  var sudoku = new Sudoku();
  var startTime = new Date();

  $('input#start_game_button').click(function() {
    window.location.assign('http://127.0.0.1:9292/game');
  });

  $('input#finish_game').one("click", function() {
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

  // $('input#autofill').click(function() {
  //   var calculateEveryThirdRow = function(i, j) {
  //     return ((Math.floor(i / 3) + j + 1) % sudoku.defaultGridSize) === 0 ? 9 : ((Math.floor(i / 3) + j + 1) % sudoku.defaultGridSize);
  //   };

  //   var calculateOtherRows = function(i, j) {
  //     return ((Math.floor(i / 3) + j + 1 + 3 * (i % 3)) % sudoku.defaultGridSize) === 0 ? 9 : ((Math.floor(i / 3) + j + 1 + 3 * (i % 3)) % sudoku.defaultGridSize);
  //   };

  //   for (i = 0; i < sudoku.defaultGridSize; i++) {
  //     for (j = 0; j < sudoku.defaultGridSize; j++) {
  //       if (i % 3 === 0) {
  //         sudoku.insert(i, j, calculateEveryThirdRow(i, j));
  //         $('#container tr input').eq(9 * i + j).val(calculateOtherRows(i, j));
  //       } else {
  //         sudoku.insert(i, j, calculateOtherRows(i, j));
  //         $('#container tr input').eq(9 * i + j).val(calculateOtherRows(i, j));
  //       }
  //     }
  //   }
  // });

  var convertArrayToIntegers = function(array) {
    return array.map(function (x) { return parseInt(x, 10); });
  };

  var getRangeOfPossibleValues = function(i, j) {
    var possibleValuesOfRow = sudoku.validationArrays.row[i];
    var possibleValuesOfColumn = sudoku.validationArrays.col[j];
    var sectionID = sudoku.calculateValidationSection(i, j);
    var possibleValuesOfSection = sudoku.validationArrays.sect[sectionID];
    var preFilteredArray = _.union(possibleValuesOfRow, possibleValuesOfColumn, possibleValuesOfSection);
    var changedArray = convertArrayToIntegers(preFilteredArray);
    var filteredArray = changedArray.filter(function(n){ return /[1-9]/.test(n); });
    return _.uniq(filteredArray);
  };

  // var backTrack = function(i, j) {

  // };

  var runAlgorithm = function(array) {
    var range = _.range(1, 10);
    var avaliableValues, existingValues, position, chosenValue;
      for (var i = 0; i < sudoku.defaultGridSize; i++) {
        for (var j = 0; j < sudoku.defaultGridSize; j++) {
          position = 9 * i + j;
          existingValues = convertArrayToIntegers(getRangeOfPossibleValues(i, j));
          avaliableValues = _.difference(range, existingValues);
          chosenValue = _.sample(avaliableValues);
          sudoku.insert(i, j, chosenValue);
          $('#container tr input').eq(position).val(chosenValue);
          while (sudoku.isGameGenerated() === false) {
            avaliableValues = _.without(avaliableValues, chosenValue);
            sudoku.remove(i, j);
            $('#container tr input').eq(position).val('');
            chosenValue = _.sample(avaliableValues);
            sudoku.insert(i, j, chosenValue);
            $('#container tr input').eq(position).val(chosenValue);
            // backtrack();
          }
     }
    }
  };

  // var randomFill = function(array) {
  //   var xCoordinate, yCoordinate, randomValue, number;
  //   for (i = 0; i < 40; i++) {
  //     number = array[i];
  //     xCoordinate = number % 9;
  //     yCoordinate = Math.floor(number / 9);
  //     randomValue = _.random(1, 9);
  //     sudoku.insert(xCoordinate, yCoordinate, randomValue);
  //     $('#container tr input').eq(number).val(randomValue);
  //   if (sudoku.isGameGenerated() === false) {
  //     sudoku.remove(xCoordinate, yCoordinate);
  //     $('#container tr input').eq(number).val('');
  //   }
  // }
  // };

  $('input#autofill').click(function() {
    runAlgorithm();
  });

  // $('input#autofill').click(function() {
  //   var randomPositionsArray = _.sample(_.range(81), 40);
  //   randomFill(randomPositionsArray);
  // });
});
