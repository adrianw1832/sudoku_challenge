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
    expect(page).to have_content '1 minutes'
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
    within 'ul#time' do
      expect(page).to have_content 'foobar'
      expect(page).to have_content '1 minutes'
    end
  end

context 'autofill button only shows for admin users 1-3' do
  scenario 'admin with user id 1 should see the button' do
    user = create(:user)
    sign_in_as(user)
    visit('/game')
    expect(page).to have_button('Auto Fill')
  end

  scenario 'admin with user id 2 should see the button' do
    user1 = create(:user)
    user2 = create(:user, email: 'potato@potato.com', username: 'potato')
    sign_in_as(user2)
    visit('/game')
    expect(page).to have_button('Auto Fill')
  end

  scenario 'autofill button only goes to admin user id 1-3' do
    user1 = create(:user)
    user2 = create(:user, email: 'potato@potato.com', username: 'potato')
    user3 = create(:user, email: 'google@google.com', username: 'google')
    sign_in_as(user3)
    visit('/game')
    expect(page).to have_button('Auto Fill')
  end

  scenario 'autofill button only goes to admin user id 1-3' do
    user1 = create(:user)
    user2 = create(:user, email: 'potato@potato.com', username: 'potato')
    user3 = create(:user, email: 'google@google.com', username: 'google')
    user4 = create(:user, email: 'leon@makers.com', username: 'makers')
    sign_in_as(user4)
    visit('/game')
    expect(page).not_to have_button('Auto Fill')
  end
end

end
