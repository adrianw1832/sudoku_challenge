describe('Sudoku', function() {
 var sudoku;

  beforeEach(function() {
    sudoku = new Sudoku();
  });

  describe('Setting up checks that', function() {
    it('there are default number of rows', function() {
      expect(Object.keys(sudoku.validationArrays.row).length).toEqual(sudoku.defaultGridSize);
    });

    it('each row has default number of entries', function() {
      expect(sudoku.validationArrays.row[0].length).toEqual(sudoku.defaultGridSize);
    });
  });

  describe('Validation', function() {
    it('can insert numbers into the validation row arrays', function() {
      sudoku.insert(1, 0, 2);
      expect(sudoku.validationArrays.row[1][0]).toEqual(2);
    });

    it('can insert numbers into the validation col arrays', function() {
      sudoku.insert(1, 0, 2);
      expect(sudoku.validationArrays.row[0][1]).toEqual(2);
    });

    it('returns true if the array is unqiue', function() {
      expect(isArrayUnique([1, 2, 3])).toBe(true);
    });

    it('returns false if the array is not unqiue', function() {
      expect(isArrayUnique([1, 2, 1])).toBe(false);
    });

    describe('checking all rows and columns, scenario 1', function() {
      beforeEach(function(){
        for (i = 0; i < sudoku.defaultGridSize; i++) {
          for (j = 0; j < sudoku.defaultGridSize; j++) {
            sudoku.insert(i, j, 1);
          }
        }
      });

      it('returns false if all the rows are not unique', function() {
        expect(sudoku.areRowsUnique()).toBe(false);
      });

      it('returns false if all the columns are not unique', function() {
        expect(sudoku.areColsUnique()).toBe(false);
      });

      it('returns false if not all rows and columns are unique', function() {
        expect(sudoku.isGameFinished()).toBe(false);
      });
    });

    describe('checking all rows and columns, scenario 2', function() {
      beforeEach(function(){
        for (i = 0; i < sudoku.defaultGridSize; i++) {
          for (j = 0; j < sudoku.defaultGridSize; j++) {
            sudoku.insert(i, j, (i + j + 1) % sudoku.defaultGridSize + 1);
          }
        }
      });

      it('returns true if all the rows are unique', function() {
        expect(sudoku.areRowsUnique()).toBe(true);
      });

      it('returns true if all the columns are unique', function() {
        expect(sudoku.areColsUnique()).toBe(true);
      });

      it('returns true if all rows and columns are unique', function() {
        expect(sudoku.isGameFinished()).toBe(true);
      });
    });
  });
});
