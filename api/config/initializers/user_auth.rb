module UserAuth
  mattr_accessor :access_token_lifetime
  self.access_token_lifetime = 30.minute

  mattr_accessor :refresh_token_lifetime
  self.refresh_token_lifetime = 1.day

  mattr_accessor :session_key
  self.session_key = :refresh_token

  mattr_accessor :user_claim
  self.user_claim = :sub

  mattr_accessor :token_issuer
  self.token_issuer = ENV["BASE_URL"]

  mattr_accessor :token_audience
  self.token_audience = ENV["BASE_URL"]

  mattr_accessor :token_signature_algorithm
  self.token_signature_algorithm = "HS256"

  mattr_accessor :token_secret_signature_key
  self.token_secret_signature_key = Rails.application.credentials.secret_key_base

  mattr_accessor :token_public_key
  self.token_public_key = nil

  mattr_accessor :not_found_exception_class
  self.not_found_exception_class = ActiveRecord::RecordNotFound
end
