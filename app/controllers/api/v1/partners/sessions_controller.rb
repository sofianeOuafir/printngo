class Api::V1::Partners::SessionsController < ApplicationController
  before_action :authenticate_partner!, only: [:destroy]

  def show
    render json: current_partner.to_json
  end

  def create
    partner = Partner.authenticate(params[:email], params[:password])
    if partner
      session[:partner_id] = partner.id
      render json: partner.to_json
    else
      render json: {
        error: 'Email or password incorrect'
      }, status: 404
    end
  end

  def destroy
    session[:partner_id] = nil
    render json: { message: 'Logout successfully' }, status: 200
  end
end
