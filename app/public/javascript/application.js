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

  var runAlgorithm = function(positionCounter) {
    var rowID, colID, existingValues, avaliableValues, chosenValue;
    var validRange = _.range(1, 10);
    positionCounter++;
    if (positionCounter > 80) {
      return true;
    } else {
      rowID = Math.floor(positionCounter / 9);
      colID = positionCounter % 9;
      existingValues = convertArrayElementsToIntegers(getExistingValues(rowID, colID));
      avaliableValues = _.shuffle(_.difference(validRange, existingValues));
      for (var i = 0; i < avaliableValues.length; i++) {
        chosenValue = avaliableValues[i];
        sudoku.insert(rowID, colID, chosenValue);
        $('#container tr input').eq(positionCounter).val(chosenValue);
        if (runAlgorithm(positionCounter)) {
          return true;
        } else {
          sudoku.remove(rowID, colID);
          $('#container tr input').eq(positionCounter).val('');
        }
      }
      return false;
    }
  };

  var convertArrayElementsToIntegers = function(array) {
    return array.map(function (element) { return parseInt(element); });
  };

  var getExistingValues = function(i, j) {
    var possibleValuesOfRow = sudoku.validationArrays.row[i];
    var possibleValuesOfColumn = sudoku.validationArrays.col[j];
    var sectionID = sudoku.calculateValidationSection(i, j);
    var possibleValuesOfSection = sudoku.validationArrays.sect[sectionID];
    var preFilteredArray = _.union(possibleValuesOfRow, possibleValuesOfColumn, possibleValuesOfSection);
    var changedArray = convertArrayElementsToIntegers(preFilteredArray);
    var filteredArray = changedArray.filter(function(n){ return /[1-9]/.test(n); });
    return _.uniq(filteredArray);
  };

  $('input#autofill').click(function() {
    runAlgorithm(-1);
  });

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
});
