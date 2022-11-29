FactoryBot.define do
  factory :user do
    name { "user_name" }
    email { "foobar@example.com" }
    introduction { "Hello!" }
    password { "foobar" }
    password_confirmation { "foobar" }
  end
end
