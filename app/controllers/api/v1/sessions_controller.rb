class Api::V1::SessionsController < ApplicationController
  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      session[:user_id] = user.id
      # return some json
    else
      # return some json
      # flash.now.alert = "Invalid email or password"
      # render "new"
    end
  end

  def destroy
    session[:user_id] = nil
    # return some json
  end
end
