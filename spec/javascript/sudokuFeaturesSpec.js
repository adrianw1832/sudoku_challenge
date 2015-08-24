describe('feature testing', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './app';
    loadFixtures('testFixture.html.erb');
  });

  it('redirects to game page', function() {
    $('input#start_game_button').click();
    expect('h1').toContainText('Have fun');
  });

  it('redirects to results page', function() {
    $('input#finish_game').click();
    expect('h1').toContainText('Result');
  });
});