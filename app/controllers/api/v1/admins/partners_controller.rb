class Api::V1::Admins::PartnersController < ApplicationController
  before_action :authenticate_admin!

  def create
    partner_application = PartnerApplication.find(params[:partner_application_id])
    partner = Partner.create(
      firstname: partner_application.firstname,
      lastname: partner_application.lastname,
      email: partner_application.email,
      name: partner_application.company_name,
      postcode: partner_application.postcode,
      address: partner_application.company_address,
      city: partner_application.city,
      country: partner_application.country,
      lat: partner_application.lat,
      lng: partner_application.lng,
      opening_hours: partner_application.opening_hours,
      partner_application_id: partner_application.id,
      password: 'abc123'
    )
    if partner.save
      render json: partner.to_json
    end
  end
end
