require 'jwt'

module UserAuth
  class RefreshToken
    include TokenCommons

    attr_reader :user_id, :payload, :token

    def initialize(user_id: nil, token: nil)
      if token.present?
        # decode
        @token = token
        @payload = JWT.decode(@token.to_s, decode_key, true, verify_claims).first
        @user_id = get_user_id_from(@payload)
      else
        # encode (issue a token)
        @user_id = encrypt_for(user_id)
        @payload = claims
        @token = JWT.encode(@payload, secret_key, algorithm, header_fields)
        remember_jti(user_id)
      end
    end

    def entity_for_user(id = nil)
      id ||= @user_id
      User.find(decrypt_for(id))
    end

    private

      def token_lifetime
        UserAuth.refresh_token_lifetime
      end

      def token_expiration
        token_lifetime.from_now.to_i
      end

      def jwt_id
        Digest::MD5.hexdigest(SecureRandom.uuid)
      end

      def claims
        {
          user_claim => @user_id,
          jti: jwt_id,
          exp: token_expiration
        }
      end

      def payload_jti
        @payload.with_indifferent_access[:jti]
      end

      def remember_jti(user_id)
        User.find(user_id).remember(payload_jti)
      end

      def verify_jti?(jti, payload)
        user_id = get_user_id_from(payload)
        decode_user = entity_for_user(user_id)
        decode_user.refresh_jti == jti
      rescue UserAuth.not_found_exception_class
        false
      end

      def verify_claims
        {
          verify_expiration: true,
          verify_jti: proc { |jti, payload|
            verify_jti?(jti, payload)
          },
          algorithm: algorithm
        }
      end
  end
end
