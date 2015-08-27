describe('feature testing', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './app/views';
  });


  describe('#Start game', function() {
    it('has a start game button', function() {
      loadFixtures('homepage.erb');
      expect('input').toHaveAttr('value', 'Start Game');
    });
  });

  describe('#Game page has', function() {
    it('9 rows and 81 cells', function() {
      loadFixtures('game.erb');
      $.holdReady(false);
      var rowCount = $('table tr').length
      var cellCount = $('table tr td').length
      expect(rowCount).toEqual(9)
      expect(cellCount).toEqual(81)
    });

    it('"Have fun" title', function() {
      loadFixtures('game.erb')
      expect('h1').toContainText('Have fun')
    });

    it('finish button', function() {
      loadFixtures('game.erb')
      expect('#finish_game').toHaveAttr('value', 'Finish')
    });
  });

  describe('#Results page', function() {
    it('has have fun', function() {
      loadFixtures('results.erb')
      expect('h1').toContainText('Results')
    });
  });



  // describe('#Test that the tables are generated', function() {
  //   $('input#start_game_button').click();
  //   console.log('hi')
  //   expect('td').toHaveAttr('class')
  // });
});