module TokenGenerateService
  def self.included(base)
    base.extend ClassMethods
  end

  module ClassMethods
    def decode_access_token(token, options = {})
      UserAuth::AccessToken.new(token: token, options: options)
    end

    def from_access_token(token, options = {})
      decode_access_token(token, options).entity_for_user
    end

    def decode_refresh_token(token)
      UserAuth::RefreshToken.new(token: token)
    end

    def from_refresh_token(token)
      decode_refresh_token(token).entity_for_user
    end
  end

  def encode_access_token(payload = {})
    UserAuth::AccessToken.new(user_id: id, payload: payload)
  end

  def to_access_token(payload = {})
    encode_access_token(payload).token
  end

  def encode_refresh_token
    UserAuth::RefreshToken.new(user_id: id)
  end

  def to_refresh_token
    encode_refresh_token.token
  end
end
