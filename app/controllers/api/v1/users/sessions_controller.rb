class Api::V1::Users::SessionsController < ApplicationController
  before_action :authenticate_user!, only: [:destroy]

  def show
    render json: current_user.to_json
  end

  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      ahoy.authenticate(user)
      session[:user_id] = user.id
      render json: user.to_json
    else
      render json: {
        error: I18n.translate('controllers.users.sessions.create.login_unsuccessful')
      }, status: 404
    end
  end

  def destroy
    session[:user_id] = nil
    cookies.delete :ahoy_visit if cookies[:ahoy_visit]
    render json: { message: I18n.translate('controllers.users.sessions.destroy.logout_successfully') }, status: 200
  end
end
