FactoryBot.define do
  factory :user do
    name { "user_name" }
    email { "foobar@example.com" }
    introduction { "Hello!" }
  end
end
