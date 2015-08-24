feature 'on the homepage' do
  let!(:user) { create :user}

  scenario 'starting a game' do
    visit '/'
    click_button 'Start Game'
    expect(current_path).to eq '/game'
    expect(page).to have_content "Have fun #{user.username}"
  end

  scenario 'shows the results' do
    visit '/results'
    expect(page).to have_content('Results')
  end

  scenario 'clicking finish' do
    visit '/game'
    click_button 'Finish'
    expect(page).to have_content 'Results'
    expect(current_path).to eq '/results'
  end
end
