class Api::V1::PartnersController < ApplicationController
  def index
    partners = Partner.all.activated
    if params['lat'].present? && params['lng'].present?
      Partner.user_position = [params['lat'], params['lng']] 
      render json: partners.sort_by(&:distance_to_user_position).to_json(methods: :distance_to_user_position)
    else
      render json: partners.to_json
    end
  end

  private

  def partners_params
    params.require(:partner).permit(:lat, :lng)
  end
end
