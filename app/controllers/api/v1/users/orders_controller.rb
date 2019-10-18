class Api::V1::Users::OrdersController < ApplicationController
  before_action :authenticate!

  def index 
    render json: current_user.orders.paid.to_json(include: :payment)
  end
end
