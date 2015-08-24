feature 'on the homepage' do

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
