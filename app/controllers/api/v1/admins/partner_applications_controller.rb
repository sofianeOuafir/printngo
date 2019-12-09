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

  private

  def partner_application_params
    params.require(:partner_application).permit(:firstname, :lastname, :email, :postcode, :company_address, :company_name)
  end
end
