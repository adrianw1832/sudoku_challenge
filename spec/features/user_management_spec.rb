feature '#User sign up' do
  let(:user) { user = build(:user) }

  scenario 'User can sign up as a new user' do
    sign_up_as(user)
    expect(current_path).to eq('/')
    expect(page).to have_content("Welcome, #{user.username}!")
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

# feature 'User can log out' do
#   let(:user) { user = build(:user) }

#   scenario 'while logged in' do
#     user = create(:user)
