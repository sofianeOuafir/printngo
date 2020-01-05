# frozen_string_literal: true

class Api::V1::Admins::SessionsController < ApplicationController
  before_action :authenticate_admin!, only: [:destroy]

  def show
    render json: current_admin.to_json
  end

  def create
    admin = Admin.authenticate(params[:email], params[:password])
    if admin
      session[:admin_id] = admin.id
      render json: admin.to_json
    else
      render json: {
        error: I18n.translate('controllers.admins.sessions.create.login_unsuccessful')
      }, status: 404
    end
  end

  def destroy
    session[:admin_id] = nil
    render json: { message: I18n.translate('controllers.admins.sessions.destroy.logout_successfully') }, status: 200
  end
end
