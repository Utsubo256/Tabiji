require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with a name, email, and introduction' do
    user = User.new(
      name: 'Example User',
      email: 'user@example.com',
      introduction: 'Hello!',
    )
    expect(user).to be_valid
  end

  it 'is invalid without a name' do
    user = User.new(name: nil)
    user.valid?
    expect(user.errors[:name]).to include("can't be blank")
  end
end
