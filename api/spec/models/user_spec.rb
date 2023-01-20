require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { FactoryBot.build(:user) }

  it 'is valid with a name, email, password, and password_confirmation' do
    expect(user).to be_valid
  end

  it 'is invalid without a name' do
    user.name = nil
    user.valid?
    expect(user.errors[:name]).to include("を入力してください")
  end

  it 'is valid with a name including 15 characters or less' do
    user.name = 'a' * 15
    expect(user).to be_valid
  end

  it 'is invalid with a name including 16 characters or more' do
    user.name = 'a' * 16
    user.valid?
    expect(user.errors[:name]).to include('は15文字以内で入力してください')
  end

  it 'is invalid without an email address' do
    user.email = nil
    user.valid?
    expect(user.errors[:email]).to include("を入力してください")
  end

  it 'is valid with an email address including 255 or less' do
    user.email = "#{'a' * 243}@example.com"
    user.valid?
    expect(user).to be_valid
  end

  it 'is invalid with an email address including 256 or more' do
    user.email = "#{'a' * 244}@example.com"
    user.valid?
    expect(user.errors[:email]).to include('は255文字以内で入力してください')
  end

  it 'is valid with the valid email address format' do
    valid_addresses = %w[alice@example.com BOB@aaa.BBB Carol_Carlos-CHARLIE@aaa.bbb.ccc Dave.erin@foo.bar frank+grace@xxx.jp]
    valid_addresses.each do |valid_address|
      user.email = valid_address
      expect(user).to be_valid
    end
  end

  it 'is invalid with the invalid email address format' do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      user.email = invalid_address
      expect(user).to_not be_valid
    end
  end

  it 'is invalid with a duplicate email address' do
    duplicate_user = user.dup
    user.save
    duplicate_user.valid?
    expect(duplicate_user.errors[:email]).to include('はすでに存在します')
  end

  it 'is valid with the email address saved as lowercase' do
    mixed_case_email = 'Alice@ExaMplE.cOM'
    user.email = mixed_case_email
    user.save
    expect(mixed_case_email.downcase).to eq user.reload.email
  end

  it 'is valid with the introduction including 255 characters or less' do
    user.introduction = 'a' * 255
    user.valid?
    expect(user).to be_valid
  end

  it 'is invalid with the introduction including 256 characters or more' do
    user.introduction = 'a' * 256
    user.valid?
    expect(user.errors[:introduction]).to include('は255文字以内で入力してください')
  end

  it 'is invalid with a blank password' do
    user.password = user.password_confirmation = ' ' * 6
    user.valid?
    expect(user.errors[:password]).to include("を入力してください")
  end

  it 'is invalid with the password including 5 characters or less' do
    user.password = user.password_confirmation = 'a' * 5
    user.valid?
    expect(user.errors[:password]).to include('は6文字以上で入力してください')
  end

  it 'is valid with the password including 6 characters' do
    user.password = user.password_confirmation = 'a' * 6
    user.valid?
    expect(user).to be_valid
  end

  it 'is valid with the password including 72 characters' do
    user.password = user.password_confirmation = 'a' * 72
    user.valid?
    expect(user).to be_valid
  end

  it 'is invalid with the password including 73 characters or more' do
    user.password = user.password_confirmation = 'a' * 73
    user.valid?
    expect(user.errors[:password]).to include('は72文字以内で入力してください')
  end

  it "is invalid when the password doesn't matches the password_confirmation" do
    user.password = 'foobar'
    user.password_confirmation = 'foobarbaz'
    user.valid?
    expect(user.errors[:password_confirmation]).to include("とパスワードの入力が一致しません")
  end

  describe 'RefreshToken' do
    let!(:user) { FactoryBot.create(:user) }

    context 'encode_token' do
      before do
        @encode = UserAuth::RefreshToken.new(user_id: user.id)
        @lifetime = UserAuth.refresh_token_lifetime
      end

      it 'is equal to payload[:exp]' do
        payload = @encode.payload
        expect_lifetime = @lifetime.from_now.to_i
        expect(expect_lifetime).to be_within(1).of(payload[:exp])
      end

      it 'is equal to payload[:jti]' do
        payload = @encode.payload
        encode_user = @encode.entity_for_user
        expect_jti = encode_user.refresh_jti
        expect(expect_jti).to eq payload[:jti]
      end

      it 'is equal to payload[:sub]' do
        payload = @encode.payload
        user_claim = @encode.send(:user_claim)
        expect(@encode.user_id).to eq payload[user_claim]
      end
    end

    context 'decode_token' do
      include ActiveSupport::Testing::TimeHelpers
      before do
        @encode = UserAuth::RefreshToken.new(user_id: user.id)
        @lifetime = UserAuth.refresh_token_lifetime
        @decode = UserAuth::RefreshToken.new(token: @encode.token)
        payload = @decode.payload
      end

      it 'is equal to the user' do
        token_user = @decode.entity_for_user
        expect(user).to eq token_user
      end

      it 'has verify_claims[:veryfy_expiration]' do
        verify_claims = @decode.send(:verify_claims)
        expect(verify_claims[:verify_expiration]).to be_truthy
      end

      it 'is equal to verify_claims[:algorithm]' do
        verify_claims = @decode.send(:verify_claims)
        expect(UserAuth.token_signature_algorithm).to eq verify_claims[:algorithm]
      end

      it 'throw an error with expired token' do
        travel_to @lifetime.from_now do
          expect { UserAuth::RefreshToken.new(token: @encode.token) }.to raise_error JWT::ExpiredSignature
        end
      end

      it "throw an error when token rewritten" do
        invalid_token = @encode.token + "a"
        expect { UserAuth::RefreshToken.new(token: invalid_token) }.to raise_error JWT::VerificationError
      end
    end
  end
end
