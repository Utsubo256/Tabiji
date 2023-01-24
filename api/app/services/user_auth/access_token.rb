require 'jwt'

module UserAuth
  class AccessToken
    include TokenCommons

    attr_reader :user_id, :payload, :lifetime, :token, :options

    def initialize(user_id: nil, payload: {}, token: nil, options: {})
      if token.present?
        # decode
        # e.g. UserAuth::AccessToken.new(token: token.token)
        # e.g. UserAuth::AccessToken.new(token: token.token, options: {sub: token.payload[:sub]})
        @token = token
        @options = options
        @payload = JWT.decode(@token.to_s, decode_key, true, verify_claims.merge(@options)).first
        @user_id = get_user_id_from(@payload)
      else
        # encode (issue a access token)
        # e.g. token = UserAuth::AccessToken.new(user_id: user.id)
        # e.g. token = UserAuth::AccessToken.new(user_id: user.id, payload: {lifetime: 1.hours})
        @user_id = encrypt_for(user_id)
        @lifetime = payload[:lifetime] || UserAuth.access_token_lifetime
        @payload = claims.merge(payload.except(:lifetime))
        @token = JWT.encode(@payload, secret_key, algorithm, header_fields)
      end
    end

    def entity_for_user
      User.find(decrypt_for(@user_id))
    end

    def lifetime_text
      time, period = @lifetime.inspect.sub(/s\z/, "").split
      time + I18n.t("datetime.periods.#{period}", default: "")
    end

    private

      def verify_issuer?
        UserAuth.token_issuer.present?
      end

      def token_issuer
        verify_issuer? && UserAuth.token_issuer
      end

      def verify_audience?
        UserAuth.token_audience.present?
      end

      def token_audience
        verify_audience? && UserAuth.token_audience
      end

      def verify_user_id?
        @user_id.present?
      end

      def token_expiration
        @lifetime.from_now.to_i
      end

      def claims
        _claims = {}
        _claims[:exp] = token_expiration
        _claims[user_claim] = @user_id if verify_user_id?
        _claims[:iss] = token_issuer if verify_issuer?
        _claims[:aud] = token_audience if verify_audience?
        _claims
      end

      def verify_subject?
        @options.has_key?(:sub)
      end

      def token_subject
        verify_subject? && @options[:sub]
      end

      def verify_claims
        {
          iss: token_issuer,
          aud: token_audience,
          sub: token_subject,
          verify_expiration: verify_issuer?,
          verify_iss: verify_issuer?,
          verify_aud: verify_audience?,
          verify_sub: verify_subject?,
          algorithm: algorithm
        }
      end
  end
end
