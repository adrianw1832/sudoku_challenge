describe('feature testing', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './app/views';
  });

  describe('#Game page has', function() {
    it('9 rows and 81 cells', function() {
      loadFixtures('game.erb');
      $.holdReady(false);
      var rowCount = $('table tr').length;
      var cellCount = $('table tr td').length;
      expect(rowCount).toEqual(9);
      expect(cellCount).toEqual(81);
    });

    it('"Have fun" title', function() {
      loadFixtures('game.erb');
      expect('h2').toContainText('Have fun');
    });

    it('generate puzzle button', function() {
      loadFixtures('game.erb');
      spyOn(Sudoku.prototype, 'runSolver');
      var sudoku = new Sudoku();
      $('.buttons.generate_sudoku').click();
      expect(sudoku.runSolver).toHaveBeenCalled();
    });
  });

  describe('#Results page', function() {
    it('has have fun', function() {
      loadFixtures('results.erb');
      expect('h1').toContainText('Congratulations! You did it in');
    });
  });
});
