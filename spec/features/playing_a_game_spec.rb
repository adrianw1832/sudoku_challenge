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

  scenario 'starting a game', js: true do
    user = build :user
    sign_up_as(user)
    visit '/'
    click_button "Start Game"
    expect(current_path).to eq '/game'
    expect(page).to have_content 'Have fun'
  end

  scenario 'shows the results' do
    user = create :user2
    record = create :record2
    user.records << record
    user.save
    sign_in_as(user)
    visit '/results'
    expect(page).to have_content 'Results'
    expect(page).to have_content '1 minutes'
  end

  scenario 'shows leaderboard' do
    create :record
    visit '/'
    expect(page).to have_content 'Leaderboard'
    within 'ul#time' do
      expect(page).to have_content 'foobar'
      expect(page).to have_content '1 minutes'
    end
  end
end
