class Api::V1::UsersController < ApplicationController
  wrap_parameters :user, include: [:firstname, :lastname, :email, :password, :password_confirmation]
  def create
    @user = User.new(users_params)
    if @user.save
      SendgridMailer.new.send_welcome_email(@user)
      render json: @user.to_json
    else
      render json: { errors: @user.errors.to_json }, status: 400
    end
  end

  private

  def users_params
    params.require(:user).permit(:firstname, :lastname, :email, :password, :password_confirmation)
  end
end
