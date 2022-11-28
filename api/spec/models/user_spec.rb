require 'rails_helper'

RSpec.describe User, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:user)).to be_valid
  end

  it 'is invalid without a name' do
    user = FactoryBot.build(:user, name: nil)
    user.valid?
    expect(user.errors[:name]).to include("can't be blank")
  end

  it 'is valid with a name including 15 characters or less' do
    expect(FactoryBot.build(:user, name: "a" * 15)).to be_valid
  end

  it 'is invalid with a name including 16 characters or more' do
    user = FactoryBot.build(:user, name: "a" * 16)
    user.valid?
    expect(user.errors[:name]).to include("is too long (maximum is 15 characters)")
  end

  it 'is invalid without an email address' do
    user = FactoryBot.build(:user, email: nil)
    user.valid?
    expect(user.errors[:email]).to include("can't be blank")
  end

  it 'is valid with an email address including 255 or less' do
    user = FactoryBot.build(:user, email: "a" * 243 + "@example.com")
  end

  it 'is invalid with an email address including 256 or more' do
    user = FactoryBot.build(:user, email: "a" * 244 + "@example.com")
    user.valid?
    expect(user.errors[:email]).to include("is too long (maximum is 255 characters)")
  end
end
