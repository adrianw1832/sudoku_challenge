var Sudoku = function Sudoku() {
  this.validationArrays = {row: [], col: []};
  this.defaultGridSize = 3;
  this.buildValidationArrays();
  this.$cellMatrix = {};
};

Sudoku.prototype.buildValidationArrays = function() {
  for (var i = 0; i < this.defaultGridSize; i++) {
    this.validationArrays.row.push([]);
    for (var j = 0; j < this.defaultGridSize; j++) {
      this.validationArrays.row[i].push('');
    }
  }

  for (var i = 0; i < this.defaultGridSize; i++) {
    this.validationArrays.col.push([]);
    for (var j = 0; j < this.defaultGridSize; j++) {
      this.validationArrays.col[i].push('');
    }
  }
};

Sudoku.prototype.insert = function(xCoordinate, yCoordinate, value) {
  this.validationArrays.row[xCoordinate][yCoordinate] = value;
  this.validationArrays.col[yCoordinate][xCoordinate] = value;
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

Sudoku.prototype.isGameFinished = function() {
  return this.areRowsUnique() && this.areColsUnique();
};


