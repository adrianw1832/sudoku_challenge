var Sudoku = function Sudoku() {
  this.validationArrays = {row: [], col: [], sect: []};
  this.defaultGridSize = 9;
  this.buildValidationArrays();
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

Sudoku.prototype.insert = function(rowID, colID, value) {
  this.validationArrays.row[rowID][colID] = value;
  this.validationArrays.col[colID][rowID] = value;
  var sectionID = this.calculateValidationSection(rowID, colID);
  this.validationArrays.sect[sectionID].push(value);
};

Sudoku.prototype.remove = function(rowID, colID) {
  this.validationArrays.row[rowID][colID] = '';
  this.validationArrays.col[colID][rowID] = '';
  var sectionID = this.calculateValidationSection(rowID, colID);
  this.validationArrays.sect[sectionID].pop();
};

Sudoku.prototype.calculateValidationSection = function(rowID, colID) {
  var sectionRowID = Math.floor(rowID / 3);
  var sectionColID = Math.floor(colID / 3);
  var sectionID = sectionRowID + 3 * sectionColID;
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
