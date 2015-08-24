feature '#User sign up' do
  let(:user) { user = build(:user) }

  scenario '' do
    sign_up_as(user)
    expect(current_path).to eq('/')
    expect(page).to have_content("Welcome, #{user.username}!")
  end
end