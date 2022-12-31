module UserAuth
  module TokenCommons

    def secret_key
      UserAuth.token_secret_signature_key
    end

    def decode_key
      UserAuth.token_public_key || secret_key
    end

    def algorithm
      UserAuth.token_signature_algorithm
    end

    def user_claim
      UserAuth.user_claim
    end

    def get_user_id_from(payload)
      payload.with_indifferent_access[user_claim]
    end

    def crypt
      salt = "signed user id"
      key_length = ActiveSupport::MessageEncryptor.key_len
      secret = Rails.application.key_generator.generate_key(salt, key_length)
      ActiveSupport::MessageEncryptor.new(secret)
    end

    def encrypt_for(user_id)
      return unless user_id
      crypt.encrypt_and_sign(user_id.to_s, purpose: :authorization)
    end

    def decrypt_for(user_id)
      return unless user_id
      crypt.decrypt_and_verify(user_id.to_s, purpose: :authorization)
    rescue
      nil
    end

    def header_fields
      {
        typ: "JWT",
        alg: algorithm
      }
    end
  end
end
