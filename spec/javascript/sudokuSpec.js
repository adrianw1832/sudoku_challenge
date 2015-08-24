describe('Sudoku', function() {
 var sudoku;

  beforeEach(function() {
    sudoku = new Sudoku();
  });

  describe('#Setting up game checks', function() {
    it('each row has 3 entries', function() {
      sudoku.buildValidationMatrix();
      expect(sudoku.matrix.rows[0].length).toEqual(3);
    });

    it('that there are 3 rows', function() {
      sudoku.buildValidationMatrix();
      expect(Object.keys(sudoku.matrix.rows).length).toEqual(3);
    });
  });

  describe('#Initialized contains', function() {
    it('default grid size', function() {
      expect(sudoku.defaultGridSize).toEqual(3);
    });
  });

  describe('#Basic game rules', function() {
    it('can insert numbers into the grid', function() {
      sudoku.insert(0,0,1);
      expect(sudoku.matrix.rows[0][0]).toEqual(1);
    });

    it('each row should be unqiue', function() {
      sudoku.insert(0,0,1);
      sudoku.insert(0,1,2);
      sudoku.insert(0,2,3);
      expect(sudoku.isRowUnique(0)).toBe(true);
    });

    it('gives false if each row is not unqiue', function() {
      sudoku.insert(0,0,1);
      sudoku.insert(0,1,2);
      sudoku.insert(0,2,1);
      expect(sudoku.isRowUnique(0)).toBe(false);
    });
  });
});
