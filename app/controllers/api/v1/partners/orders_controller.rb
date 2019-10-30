class Api::V1::Partners::OrdersController < ApplicationController
  before_action :authenticate_partner!

  def show
    secret_code = params[:id].strip.upcase
    order = Order.paid.find_by(secret_code: secret_code)
    if order.present?
      render json: order.to_json(include: [{deliverables: { include: :product }}, :user]), status: 200
    else
      render json: {}, status: 404
    end
  end
end
