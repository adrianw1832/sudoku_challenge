var Sudoku = function Sudoku() {
  this.validationArrays = {row: [], col: [], sect: []};
  this.defaultGridSize = 9;
  this.buildValidationArrays();
  this.recursionCounter = 0;
};

Sudoku.prototype.buildValidationArrays = function() {
  this.buildValidationRows();
  this.buildValidationColumns();
  this.buildValidationSections();
};

Sudoku.prototype.buildValidationRows = function() {
  for (var rowID = 0; rowID < this.defaultGridSize; rowID++) {
    this.validationArrays.row.push([]);
    for (var colID = 0; colID < this.defaultGridSize; colID++) {
      this.validationArrays.row[rowID].push('');
    }
  }
};

Sudoku.prototype.buildValidationColumns = function() {
  for (var rowID = 0; rowID < this.defaultGridSize; rowID++) {
    this.validationArrays.col.push([]);
    for (var colID = 0; colID < this.defaultGridSize; colID++) {
      this.validationArrays.col[rowID].push('');
    }
  }
};

Sudoku.prototype.buildValidationSections = function() {
  for (var rowID = 0; rowID < this.defaultGridSize; rowID++) {
    this.validationArrays.sect.push([]);
  }
};

Sudoku.prototype.insertEntry = function(rowID, colID, value) {
  value = parseInt(value);
  this.validationArrays.row[rowID][colID] = value;
  this.validationArrays.col[colID][rowID] = value;
  var sectionID = this.calculateValidationSection(rowID, colID);
  this.validationArrays.sect[sectionID].push(value);
};

Sudoku.prototype.removeEntry = function(rowID, colID, value) {
  this.validationArrays.row[rowID][colID] = '';
  this.validationArrays.col[colID][rowID] = '';
  var sectionID = this.calculateValidationSection(rowID, colID);
  var index = this.validationArrays.sect[sectionID].indexOf(value);
  this.validationArrays.sect[sectionID].splice(index, 1);
};

Sudoku.prototype.calculateValidationSection = function(rowID, colID) {
  var sectionRowID = Math.floor(rowID / 3);
  var sectionColID = Math.floor(colID / 3);
  var sectionID = 3 * sectionRowID + sectionColID;
  return sectionID;
};

var isArrayUnique = function(element, index, array) {
  var filteredArray = element.filter(function(n){ return /[1-9]/.test(n); });
  var sudoku = new Sudoku();
  return _.uniq(filteredArray).length === sudoku.defaultGridSize;
};

Sudoku.prototype.areRowsUnique = function() {
  return this.validationArrays.row.every(isArrayUnique);
};

Sudoku.prototype.areColsUnique = function() {
  return this.validationArrays.col.every(isArrayUnique);
};

Sudoku.prototype.areSectsUnique = function() {
  return this.validationArrays.sect.every(isArrayUnique);
};

Sudoku.prototype.isGameFinished = function() {
  return this.areRowsUnique() && this.areColsUnique() && this.areSectsUnique();
};

Sudoku.prototype.runSolver = function(rowID, colID) {
  var nextEmptyCell, avaliableValues, chosenValue;
  this.recursionCounter++;
  nextEmptyCell = this.getNextEmptyCell(rowID, colID);
  rowID = nextEmptyCell[0];
  colID = nextEmptyCell[1];
  if (rowID === 9 && colID === 0) {
    return true;
  } else {
    avaliableValues = _.shuffle(this.getAvaliableValues(rowID, colID));
    for (var i = 0; i < avaliableValues.length; i++) {
      chosenValue = avaliableValues[i];
      this.insertEntry(rowID, colID, chosenValue);
      if (this.runSolver(rowID, colID)) {
        return true;
      } else {
        this.removeEntry(rowID, colID, chosenValue);
      }
    }
    return false;
  }
};

Sudoku.prototype.getNextEmptyCell = function(rowID, colID) {
  while (this.validationArrays.row[rowID][colID] !== '') {
    colID++;
    if (colID > 8) { rowID++; colID = 0; }
    if (rowID === 9 && colID === 0) break;
  }
  return [rowID, colID];
};

Sudoku.prototype.getAvaliableValues = function(rowID, colID) {
  var validRange = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return _.difference(validRange, this.getExistingValues(rowID, colID));
};

Sudoku.prototype.getExistingValues = function(rowID, colID) {
  var existingValuesOfRow = this.validationArrays.row[rowID];
  var existingValuesOfColumn = this.validationArrays.col[colID];
  var sectionID = this.calculateValidationSection(rowID, colID);
  var existingValuesOfSection = this.validationArrays.sect[sectionID];
  var preFilteredArray = _.union(existingValuesOfRow, existingValuesOfColumn, existingValuesOfSection);
  return _.without(preFilteredArray, '');
};

Sudoku.prototype.randomlyRemoveNumberOfCells = function(numberOfCells) {
  var rowID, colID, value, randomPosition;
  var sampledArray = _.sample(_.range(81), numberOfCells);
  for (var counter = 0; counter < sampledArray.length; counter++) {
    randomPosition = sampledArray[counter];
    rowID = Math.floor(randomPosition / 9);
    colID = randomPosition % 9;
    value = this.validationArrays.row[rowID][colID];
    this.removeEntry(rowID, colID, value);
  }
};

Sudoku.prototype.buildGUI = function() {
  var row, cell, input, sectionRowID, sectionColID;
  for (var rowID = 0; rowID < this.defaultGridSize; rowID++) {
    row = $('<tr>');
    $('#sudoku').append(row);
    for (var colID = 0; colID < this.defaultGridSize; colID++) {
      cell = $('<td>');
      input = ($('<input>').attr('maxlength', 1)
        .on('keyup', $.proxy(this.findDetails, this))
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

Sudoku.prototype.findDetails = function(cell) {
  var value = $(cell.currentTarget).val();
  var rowID = $(cell.currentTarget).data().row;
  var colID = $(cell.currentTarget).data().col;
  this.insertEntry(rowID, colID, value);
};

Sudoku.prototype.printSudokuToScreen = function() {
  var rowID, colID, value;
  for (counter = 0; counter < 81; counter++) {
    rowID = Math.floor(counter / 9);
    colID = counter % 9;
    value = this.validationArrays.row[rowID][colID];
    $('#sudoku tr input').eq(counter).val(value);
  }
};
