module Helpers
  def sign_up_as(user)
    visit('/')
    click_link('Register')
    fill_in('email', with: user.email)
    fill_in('password', with: user.password)
    fill_in('password_confirmation', with: user.password_confirmation)
    fill_in('username', with: user.username)
    click_button('Register')
  end

  def sign_in_as(user)
    visit('/')
    click_link('Log in')
    fill_in('username', with: user.username)
    fill_in('password', with: user.password)
    click_button('Log in')
  end
end
