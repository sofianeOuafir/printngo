# frozen_string_literal: true

class Api::V1::PartnerApplicationsController < ApplicationController
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
    params.require(:partner_application).permit(:firstname, :lastname, :email, :postcode, :company_address, :company_name)
  end
end
