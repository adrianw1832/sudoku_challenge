var Sudoku = function Sudoku() {
  this.validationArrays = {row: [], col: []};
  this.defaultGridSize = 9;
  this.buildValidationArrays();
  this.$cellMatrix = {};
};

Sudoku.prototype.buildValidationArrays = function() {
  for (i = 0; i < this.defaultGridSize; i++) {
    this.validationArrays.row.push([]);
    for (j = 0; j < this.defaultGridSize; j++) {
      this.validationArrays.row[i].push(' ');
    }
  }
  this.validationArrays.col = this.validationArrays.row;
};

Sudoku.prototype.insert = function(xCoordinate, yCoordinate, value) {
  this.validationArrays.row[xCoordinate][yCoordinate] = value;
  this.validationArrays.col[yCoordinate][xCoordinate] = value;
};

var isArrayUnique = function(element, index, array) {
  var sudoku = new Sudoku();
  return _.uniq(element).length === sudoku.defaultGridSize;
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


