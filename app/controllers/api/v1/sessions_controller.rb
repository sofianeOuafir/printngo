class Api::V1::SessionsController < ApplicationController
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
        error: 'Username or password incorrect'
      }, status: 404
    end
  end

  def destroy
    session[:user_id] = nil
    # return some json
  end
end
