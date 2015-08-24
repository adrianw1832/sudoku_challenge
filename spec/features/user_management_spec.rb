feature '#User sign up' do
  let(:user) { user = build(:user) }

  scenario 'User can sign up as a new user' do
    sign_up_as(user)
    expect(current_path).to eq('/')
    expect(page).to have_content("Welcome, #{user.username}!")
  end

  scenario 'User cannot sign up unless all details are filled' do
    user = build(:user, email: '', username: '')
    sign_up_as(user)
    expect(current_path).to eq('/users')
    expect(page).to have_content('Email must not be blank')
    expect(page).to have_content('Username must not be blank')
    sign_in_as(user)
    expect(page).to have_content('The email or password is incorrect')
  end
end

feature '#User sign in' do
  let(:user) { user = build(:user) }

  scenario 'User gets logged in after signing up' do
    user = create(:user)
    sign_in_as(user)
    expect(current_path).to eq('/')
    expect(page).to have_content("Welcome, #{user.username}!")
  end
end

feature '#User can log out' do
  scenario 'while logged in' do
    user = create(:user)
    visit('/')
    expect(page).not_to have_button('Log out')
    sign_in_as(user)
    click_button('Log out')
    expect(page).to have_content("Goodbye, #{user.username}!")
    expect(page).not_to have_content("Welcome, #{user.username}!")
  end
end
