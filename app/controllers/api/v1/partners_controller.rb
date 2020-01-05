class Api::V1::PartnersController < ApplicationController
  def index
    sw_corner = [params['boundsSWLat'], params['boundsSWLng']]
    ne_corner = [params['boundsNELat'], params['boundsNELng']]
    partners = Partner.all.activated.within_bounding_box(sw_corner, ne_corner)
    if params['usersPositionlat'].present? && params['usersPositionlng'].present?
      Partner.user_position = [params['usersPositionlat'], params['usersPositionlng']] 
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
