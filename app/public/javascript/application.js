$(document).ready(function() {
  var sudoku = new Sudoku();
  var startTime = new Date();

  $('input#start_game_button').click(function() {
    window.location.assign('http://127.0.0.1:9292/game');
  });

  $('input#finish_game').one("click", function() {
    if (sudoku.isGameFinished()) {
      var endTime = new Date();
      var timeTaken = (endTime - startTime) / 1000;
      sendResult(timeTaken);
      setTimeout(function () {
      window.location.assign('http://127.0.0.1:9292/results');
    }, 1000 );
    }
  });

  var sendResult = function(timeTaken) {
    $.post('http://127.0.0.1:9292/results', { seconds: timeTaken });
  };

  var buildGUI = function() {
    var row, cell, input, sectionRowID, sectionColID;
    for (var rowID = 0; rowID < sudoku.defaultGridSize; rowID++) {
      row = $('<tr>');
      $('#container').append(row);
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
    var xCoordinate = $(cell.currentTarget).data().row;
    var yCoordinate = $(cell.currentTarget).data().col;
    sudoku.insert(xCoordinate, yCoordinate, value);
  };

  buildGUI();

  var runAlgorithm = function(positionCounter) {
    var rowID, colID, existingValues, avaliableValues, chosenValue;
    var validRange = _.range(1, 10);
    sudoku.recursionCounter++;
    positionCounter++;
    positionCounter = getNextEmptyCell(positionCounter);
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
          sudoku.backtrackCounter++;
          sudoku.remove(rowID, colID);
          $('#container tr input').eq(positionCounter).val('');
        }
      }
      return false;
    }
  };

  var getNextEmptyCell = function(positionCounter) {
    if (positionCounter < 80) {
      while ($('#container tr input').eq(positionCounter).val() !== '') {
        positionCounter++;
      }
    }
    return positionCounter;
  };

  var convertArrayElementsToIntegers = function(array) {
    return array.map(function (element) { return parseInt(element); });
  };

  var getExistingValues = function(rowID, colID) {
    var existingValuesOfRow = sudoku.validationArrays.row[rowID];
    var existingValuesOfColumn = sudoku.validationArrays.col[colID];
    var sectionID = sudoku.calculateValidationSection(rowID, colID);
    var existingValuesOfSection = sudoku.validationArrays.sect[sectionID];
    var preFilteredArray = _.union(existingValuesOfRow, existingValuesOfColumn, existingValuesOfSection);
    var convertedArray = convertArrayElementsToIntegers(preFilteredArray);
    var filteredArray = convertedArray.filter(function(element){ return /[1-9]/.test(element); });
    return _.uniq(filteredArray);
  };


  $('input#autofill').click(function() {
    runAlgorithm(-1);
    console.log(sudoku);
    console.log(sudoku.recursionCounter);
    console.log(sudoku.backtrackCounter);
  });

  var randomlyRemoveCells = function() {
    var rowID, colID, randomValue;
    var sampledArray = _.sample(_.range(81), 1);
    for (var counter = 0; counter < sampledArray.length; counter++) {
      randomValue = sampledArray[counter];
      rowID = Math.floor(randomValue / 9);
      colID = randomValue % 9;
      sudoku.remove(rowID, colID);
      $('#container tr input').eq(randomValue).val('');
    }
  };

  // runAlgorithm(-1);
  // randomlyRemoveCells();

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
