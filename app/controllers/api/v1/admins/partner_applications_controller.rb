# frozen_string_literal: true

class Api::V1::Admins::PartnerApplicationsController < ApplicationController
  before_action :authenticate_admin!

  def index
    partner_applications = if params[:archived] == 'true'
                             PartnerApplication.archived
                           else
                             PartnerApplication.not_archived
                           end
    render json: partner_applications.to_json
  end

  def show
    partner_application = PartnerApplication.find(params[:id])
    render json: partner_application.to_json
  end

  def update
    partner_application = PartnerApplication.find(params[:id])
    if partner_application.update(partner_application_params)
      render json: partner_application.to_json
    else
      render json: { errors: partner_application.errors.to_json }, status: 400
    end
  end

  def create
    partner_application = PartnerApplication.new(partner_application_params)
    if partner_application.save
      render json: partner_application.to_json
    else
      render json: { errors: partner_application.errors.to_json }, status: 400
    end
  end

  private

  def partner_application_params
    params.require(:partner_application).permit(:firstname, :lastname,
                                                :email, :postcode,
                                                :company_address,
                                                :company_name,
                                                :city, :country, :lat, :lng,
                                                :opening_hours, :archived,
                                                :phone_number, :bank_details)
  end
end
