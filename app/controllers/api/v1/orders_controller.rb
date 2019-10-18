class Api::V1::OrdersController < ApplicationController
  def show
    if params[:id] != 'undefined'
      render json: current_user.orders.find(params[:id]).to_json(include: [{ order_items: { include: [:document, :product] } }, :partner, :user])
    else
      render json: current_order.to_json(include: [{ order_items: { include: [:document, :product] } }, :partner, :user])
    end
  end

  def update
    current_order.update(order_params)
    render json: current_order.to_json(include: :partner)
  end

  private

  def order_params
    params.require(:order).permit(:partner_id, :agreed_to_terms_and_conditions)
  end
end
