class Api::V1::Admins::PartnersController < ApplicationController
  before_action :authenticate_admin!

  def create
    partner_application = PartnerApplication.find(params[:partner_application_id])
    partner = Partner.new(
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
      phone_number: partner_application.phone_number,
      bank_details: partner_application.bank_details,
      opening_hours: partner_application.opening_hours,
      partner_application_id: partner_application.id,
      password: 'abc123'
    )
    if partner.save
      partner.activations.create
      render json: partner.to_json
    else
      render json: { errors: partner.errors.to_json }, status: 400
    end
  end
end
