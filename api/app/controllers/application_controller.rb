class ApplicationController < ActionController::API
  include ActionController::Cookies
  include UserAuthenticateService

  # APIにリクエストを送る方法は大きく2つ。1.XMLHttpRequest, 2.form要素を使ったリクエスト。ここでは後者を悪用したCSRFを防ぐ
  before_action :xhr_request?

  private

    def xhr_request?
      # リクエストヘッダー X-Requested-With: 'XMLHttpRequest'の存在を判定
      return if request.xhr?
      head :forbidden
    end

    def response_500(msg = "Internal Server Error")
      render json: { errors: msg }, status: :internal_server_error
    end
end
