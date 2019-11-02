class Api::V1::Partners::OrdersController < ApplicationController
  before_action :authenticate_partner!

  def index
    render json: current_partner.orders.order(created_at: :desc).to_json(include: [{ deliverables: { include: [:product, :printing_attempts] } }, :user])
  end

  def show
    order = Order.searchable_by_partner.find_by(secret_code: params[:id])
    if order.present?
      render json: order.to_json(include: [{deliverables: { include: [:product, :printing_attempts] }}, :user]), status: 200
    else
      render json: {}, status: 404
    end
  end

  def update
    order = Order.searchable_by_partner.find_by(secret_code: params[:id])
    order.update(printer_id: current_partner.id)
    order.reload
    render json: order.to_json
  end

  private

  def order_params
    params.require(:order).permit(:printer_id)
  end
end
