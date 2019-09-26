class Api::V1::OrdersController < ApplicationController
  def show
    render json: current_order.to_json(include: { order_items: { include: :document } })
  end
end
