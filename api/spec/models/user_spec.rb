require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with a name, email, password, and password_confirmation' do
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

  it 'is valid with the valid email address format' do
    user = FactoryBot.build(:user)
    valid_addresses = %w[alice@example.com BOB@aaa.BBB Carol_Carlos-CHARLIE@aaa.bbb.ccc Dave.erin@foo.bar frank+grace@xxx.jp]
    valid_addresses.each do |valid_address|
      user.email = valid_address
      expect(user).to be_valid
    end
  end

  it 'is invalid with the invalid email address format' do
    user = FactoryBot.build(:user)
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      user.email = invalid_address
      expect(user).to_not be_valid
    end
  end

  it 'is invalid with a duplicate email address' do
    user = FactoryBot.build(:user)
    duplicate_user = user.dup
    user.save
    duplicate_user.valid?
    expect(duplicate_user.errors[:email]).to include("has already been taken")
  end

  it 'is valid with the email address saved as lowercase' do
    user = FactoryBot.build(:user)
    mixed_case_email = "Alice@ExaMplE.cOM"
    user.email = mixed_case_email
    user.save
    expect(mixed_case_email.downcase).to eq user.reload.email
  end

  it 'is invalid with a blank password' do
    user = FactoryBot.build(:user)
    user.password = user.password_confirmation = ' ' * 6
    user.valid?
    expect(user.errors[:password]).to include("can't be blank")
  end

  it 'is invalid with the password including 5 characters or less' do
    user = FactoryBot.build(:user)
    user.password = user.password_confirmation = 'a' * 5
    user.valid?
    expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
  end

  it 'is valid with the password including 6 characters' do
    user = FactoryBot.build(:user)
    user.password = user.password_confirmation = 'a' * 6
    user.valid?
    expect(user).to be_valid
  end

  it 'is valid with the password including 72 characters' do
    user = FactoryBot.build(:user)
    user.password = user.password_confirmation = 'a' * 72
    user.valid?
    expect(user).to be_valid
  end

  it 'is invalid with the password including 73 characters or more' do
    user = FactoryBot.build(:user)
    user.password = user.password_confirmation = 'a' * 73
    user.valid?
    expect(user.errors[:password]).to include("is too long (maximum is 72 characters)")
  end

  it "is invalid when the password doesn't matches the password_confirmation" do
    user = FactoryBot.build(:user)
    user.password = "foobar"
    user.password_confirmation = "foobarbaz"
    user.valid?
    expect(user.errors[:password_confirmation]).to include("doesn't match Password")
  end
end
