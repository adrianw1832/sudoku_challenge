FactoryGirl.define do
  factory :user do
    email 'foo@bar.com'
    password 'secret1234'
    password_confirmation 'secret1234'
    username 'foobar'
  end

  factory :record do
    time '60'
    user
  end

  factory :user2, class: User do
    email 'foo2@bar.com'
    password 'secret1234'
    password_confirmation 'secret1234'
    username 'foobar2'
  end

  factory :record2, class: Record do
    time '60'
    user
  end
end
