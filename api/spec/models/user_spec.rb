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
end
