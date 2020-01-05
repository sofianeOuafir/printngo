class Api::V1::Partners::SessionsController < ApplicationController
  before_action :authenticate_partner!, only: [:destroy]

  def show
    render json: current_partner.to_json
  end

  def create
    partner = Partner.authenticate(params[:email], params[:password])
    if partner&.activated?
      session[:partner_id] = partner.id
      render json: partner.to_json
    elsif partner
      render json: {
        error: I18n.translate('controllers.partners.sessions.create.account_not_activated')
      }, status: 404
    else
      render json: {
        error: I18n.translate('controllers.partners.sessions.create.login_unsuccessful')
      }, status: 404
    end
  end

  def destroy
    session[:partner_id] = nil
    render json: { message: I18n.translate('controllers.partners.sessions.destroy.logout_successfully') }, status: 200
  end
end
