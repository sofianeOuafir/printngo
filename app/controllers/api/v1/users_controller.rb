class Api::V1::UsersController < ApplicationController
  def create
    @user = User.new(params[:user])
    if @user.save
      # respond with some json
    else
      # respond with some json error
    end
  end
end
