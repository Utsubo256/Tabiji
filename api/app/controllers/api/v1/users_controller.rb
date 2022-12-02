class API::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show]

  def show
    render json: {
      name: @user.name,
      email: @user.email,
      introduction: @user.introduction
    }, status: :ok
  end

  private

    def set_user
      @user = User.find(params[:id])
    end
end
