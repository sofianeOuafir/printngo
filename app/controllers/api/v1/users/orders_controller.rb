class Api::V1::Users::OrdersController < ApplicationController
  def index 
    render json: current_user.orders.paid.to_json
  end
end
