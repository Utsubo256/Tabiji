class API::V1::AuthTokenController < ApplicationController
  include UserSessionizeService

  # 404エラーが発生した場合にヘッダーのみを返す
  rescue_from UserAuth.not_found_exception_class, with: :not_found
  # refresh_tokenのInvalidErrorが発生した場合はカスタムエラーを返す
  rescue_from JWT::InvalidJtiError, with: :invalid_jti

  before_action :authenticate, only: %i[create]
  before_action :delete_session, only: %i[create]
  before_action :sessionize_user, only: %i[refresh, destroy]

  def create
    @user = login_user
    set_refresh_token_to_cookie
    render json: login_response
  end

  def refresh
    @user = session_user
    set_refresh_token_to_cookie
    render json: login_response
  end

  def destroy
    delete_session if session_user.forget
    cookies[session_key].nil? ? head(:ok) : response_500("Could not delete session")
  end

  private

    def login_user
      @_login_user ||= User.find_by(email: auth_params[:email])
    end

    def authenticate
      unless login_user.present? && login_user.authenticate(auth_params[:password])
        raise UserAuth.not_found_exception_class
      end
    end

    def set_refresh_token_to_cookie
      cookies[session_key] = {
        value: refresh_token,
        expires: refresh_token_expiration,
        secure: Rails.env.production?,
        http_only: true
      }
    end

    def login_response
      {
        token: access_token,
        expires: access_token_expiration,
        user: @user.response_json(sub: access_token_subject)
      }
    end

    def encode_refresh_token
      @_encode_refresh_token ||= @user.encode_refresh_token
    end

    def refresh_token
      encode_refresh_token
    end

    def refresh_token_expiration
      Time.at(encode_refresh_token.payload[:exp])
    end

    def encode_access_token
      @_encode_access_token ||= @user.encode_access_token
    end

    def access_token
      encode_access_token.token
    end

    def access_token_expiration
      encode_access_token.payload[:exp]
    end

    def access_token_subject
      encode_access_token.payload[:sub]
    end

    def not_found
      head(:not_found)
    end

    def invalid_jti
      msg = "Invalid jti for refresh token"
      render json: { errors: msg }, status: :unauthorized
    end

    def auth_params
      params.require(:auth).permit(:email, :password)
    end
end
