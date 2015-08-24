feature 'on the homepage' do

  scenario 'starting a game' do
    visit '/game'
    expect(page).to have_content 'Have fun'
  end

  scenario 'shows the results' do
    visit '/results'
    expect(page).to have_content('Results')
  end
end
