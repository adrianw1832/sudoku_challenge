var Sudoku = function Sudoku() {
 this.matrix = {rows: {}};
 this.defaultGridSize = 3;
 this.buildValidationMatrix();
};

Sudoku.prototype.buildValidationMatrix = function() {
 for (i = 0; i < this.defaultGridSize; i++) {
   this.matrix.rows[i] = [];
   for (j = 0; j < this.defaultGridSize; j++) {
     this.matrix.rows[i].push(' ');
   }
 }
};

Sudoku.prototype.insert = function(xCoordinate, yCoordinate, value) {
 this.matrix.rows[xCoordinate][yCoordinate] = value;
};

Sudoku.prototype.isRowUnique = function(rowNumber) {
  return _.uniq(this.matrix.rows[rowNumber]).length === this.defaultGridSize;
};
