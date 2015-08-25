feature 'on the homepage' do

  context '#Starting a game' do
    scenario 'player cannot start game unless signed in' do
      visit('/')
      expect(page).not_to have_button('Start Game')
    end

    scenario 'player can start game when signed in' do
      user = create(:user)
      sign_in_as(user)
      visit('/')
      expect(page).to have_button('Start Game')
    end
  end

  scenario 'starting a game' do
    visit '/game'
    expect(page).to have_content 'Have fun'
  end

  scenario 'shows the results' do
    visit '/results'
    expect(page).to have_content 'Results'
  end

  scenario 'shows leaderboard' do
    visit '/'
    expect(page).to have_content 'Leaderboard'
    within "ul#records"
    expect(page).to have_content 'User'
  end
end
