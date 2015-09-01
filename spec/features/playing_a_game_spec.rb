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
    click_button 'Start Game'
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
    expect(page).to have_content '1 minute 0 seconds'
  end

  scenario 'redirect to results', js: true do
    user = build :user
    sign_up_as(user)
    visit '/'
    click_button 'Start Game'
    click_button 'Auto Fill'
    click_button 'Finish'
    expect(page).to have_content 'Result'
    expect(current_path).to eq '/results'
  end

  scenario 'shows leaderboard' do
    create :record
    visit '/'
    expect(page).to have_content 'Leaderboard'
    within 'ul.records' do
      expect(page).to have_content 'foobar'
      expect(page).to have_content '1 minute 0 seconds'
    end
  end
end

context 'autofill button only shows for the admin' do
  scenario 'admin with user id 1 should see the button' do
    user = create(:user)
    sign_in_as(user)
    visit('/game')
    expect(page).to have_button('Auto Fill')
  end

  xscenario 'user with user id 2 should not see the button' do
    create(:user)
    user2 = create(:user2)
    sign_in_as(user2)
    visit('/game')
    expect(page).not_to have_button('Auto Fill')
  end
end
