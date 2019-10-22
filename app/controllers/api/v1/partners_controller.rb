class Api::V1::PartnersController < ApplicationController
  def index
    if params["lat"].present? && params["lng"].present?
      render json: Partner.all.order(name: :asc).to_json
    else
      
      render json: Partner.all.order(name: :desc).to_json
    end
  end

  private

  def partners_params
    params.require(:partner).permit(:lat, :lng)
  end
end
