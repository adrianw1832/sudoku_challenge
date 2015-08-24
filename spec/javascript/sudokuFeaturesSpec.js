describe('feature testing', function() {

  beforeEach(function() {
    jasmine.getFixtures.fixturesPath = '.';
    loadFixtures()
  });

  it('redirects to game page', function() {
    $('input#start_game_button').click();
    expect('body').toContainText('Have fun')
  });

});