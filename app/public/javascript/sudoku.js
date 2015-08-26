var Sudoku = function Sudoku() {
<<<<<<< HEAD
  this.validationArrays = {row: [], col: []};
  this.defaultGridSize = 1;
=======
  this.validationArrays = {row: [], col: [], sect: []};
  this.defaultGridSize = 9;
>>>>>>> adrianw1832/master
  this.buildValidationArrays();
};

Sudoku.prototype.buildValidationArrays = function() {
  this.buildValidationRows();
  this.buildValidationColumns();
  this.buildValidationSections();
};

Sudoku.prototype.buildValidationRows = function() {
  for (var i = 0; i < this.defaultGridSize; i++) {
    this.validationArrays.row.push([]);
    for (var j = 0; j < this.defaultGridSize; j++) {
      this.validationArrays.row[i].push('');
    }
  }
};

Sudoku.prototype.buildValidationColumns = function() {
  for (var i = 0; i < this.defaultGridSize; i++) {
    this.validationArrays.col.push([]);
    for (var j = 0; j < this.defaultGridSize; j++) {
      this.validationArrays.col[i].push('');
    }
  }
};

Sudoku.prototype.buildValidationSections = function() {
  for (var i = 0; i < this.defaultGridSize; i++) {
    this.validationArrays.sect.push([]);
  }
};

Sudoku.prototype.insert = function(xCoordinate, yCoordinate, value) {
  this.validationArrays.row[xCoordinate][yCoordinate] = value;
  this.validationArrays.col[yCoordinate][xCoordinate] = value;
  this.calculateValidationSection(xCoordinate, yCoordinate, value);
};

Sudoku.prototype.calculateValidationSection = function(xCoordinate, yCoordinate, value) {
  var sectionRowID = Math.floor(xCoordinate / 3);
  var sectionColID = Math.floor(yCoordinate / 3);
  var sectionID = sectionRowID + 3 * sectionColID;
  this.validationArrays.sect[sectionID].push(value);

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
