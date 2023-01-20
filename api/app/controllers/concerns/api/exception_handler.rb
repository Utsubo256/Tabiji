module API::ExceptionHandler
  extend ActiveSupport::Concern

  included do
    # https://edgeapi.rubyonrails.org/classes/ActiveSupport/Rescuable/ClassMethods.html#method-i-rescue_from
    # rescue_fromは下から上へ評価されるので範囲の広いものを上へ記載する
    rescue_from StandardError, with: :render_500
    rescue_from ActiveRecord::RecordInvalid, with: :render_422
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
  end

  private

    def render_404(invalid)
      option = { "detail": invalid.message }
      render_error(404, 'ユーザが見つかりません', option)
    end

    def render_422(invalid)
      error = invalid.record.errors.messages.map { |key, value| {"#{key}": value.length >= 2 ? value : value.first} }
      option = { "invalid-params": error }
      render_error(422, "バリデーションに失敗しました", option)
    end

    def render_500(invalid)
      option = { "detail": invalid.message }
      render_error(500, 'Internal Server Error', option)
    end

    def render_error(code, title, option)
      basic_response = {
        "title": title
      }
      response = basic_response.merge(option) unless option.nil?

      render json: response, status: code
    end
end
