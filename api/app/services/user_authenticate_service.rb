module UserAuthenticateService
  def authenticate_user
    current_user.present? || unauthorized_user
  end

  private

    def token_from_request_headers
      request.headers["Authorization"]&.split&.last
    end

    def fetch_user_from_access_token
      User.from_access_token(token_from_request_headers)
    rescue UserAuth.not_found_exception_class, JWT::DecodeError, JWT::EncodeError
      nil
    end

    def current_user
      return nil unless token_from_request_headers
      @_current_user ||= fetch_user_from_access_token
    end

    def unauthorized_user
      cookies.delete(UserAuth.session_key)
      head(:unauthorized)
    end
end
