describe User do
  let(:user) { create(:user) }

  it 'authenticates when given a valid email address and password' do
    authenticated_user = described_class.authenticate(user.username, user.password)
    expect(authenticated_user).to eq user
  end

  it 'does not authenticate when given an incorrect password' do
    expect(described_class.authenticate(user.username, 'wrong_password')).to be_nil
  end
end
