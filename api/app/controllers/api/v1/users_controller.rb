class API::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show]

  def show
    render json: {
      id: @user.id,
      name: @user.name,
      email: @user.email,
      introduction: @user.introduction,
      createdAt: @user.created_at,
      updatedAt: @user.updated_at
    }, status: :ok
  end

  def create
    user = User.new(user_params)
    if user.save
      head :created
    else
      render json: { errors: user.errors.messages }, status: :bad_request
    end
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
