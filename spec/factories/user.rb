FactoryGirl.define do
  factory :user do
    email 'foo@bar.com'
    password 'secret1234'
    password_confirmation 'secret1234'
    username 'foobar'
  end
end
