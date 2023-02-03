class API::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show]

  def show
    render status: :ok
  end

  def create
    User.create!(user_params)
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
