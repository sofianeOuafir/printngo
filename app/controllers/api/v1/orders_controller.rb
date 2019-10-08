class Api::V1::OrdersController < ApplicationController
  def index
    render json: current_user.orders.paid.to_json
  end

  def show
    render json: current_order.to_json(include: [{ order_items: { include: :document } }, :partner, :user])
  end

  def update
    current_order.update(order_params)
    render json: current_order.to_json(include: :partner)
  end

  private

  def order_params
    params.require(:order).permit(:partner_id)
  end
end
