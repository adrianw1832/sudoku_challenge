describe('feature testing', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './app/views';
    loadFixtures('game.erb');
      $.holdReady(false);
  });

  // I have to put all tests under one due to holdReady?
  describe('#Game page has', function() {
    it('9 rows and 81 cells', function() {
      expect($('table tr').length).toEqual(9);
      expect($('table tr td').length).toEqual(81);
      spyOn(Sudoku.prototype, 'runSolver');
      spyOn(Sudoku.prototype, 'randomlyRemoveNumberOfCells');
      spyOn($.fn, 'printSudokuToScreen').and.callThrough();
      expect('.buttons.generate_sudoku').toBeVisible();
      expect('.buttons.auto_solve').toBeVisible();
      $('.buttons.generate_sudoku').click();
      expect('.buttons.generate_sudoku').toBeHidden();
      expect('.buttons.auto_solve').toBeHidden();
      expect('.buttons.finish_game').toBeVisible();
      var sudoku = new Sudoku();
      expect(sudoku.runSolver).toHaveBeenCalled();
      expect(sudoku.randomlyRemoveNumberOfCells).toHaveBeenCalled();
      expect($.fn.printSudokuToScreen).toHaveBeenCalled();
    });

    it('"Have fun" title', function() {
      expect('h2').toContainText('Have fun');
    });
  });

  describe('#Results page', function() {
    it('has have fun', function() {
      loadFixtures('results.erb');
      expect('h1').toContainText('Congratulations! You did it in');
    });
  });
});
