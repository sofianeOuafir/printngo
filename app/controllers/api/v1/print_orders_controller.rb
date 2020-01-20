class Api::V1::PrintOrdersController < ApplicationController
  def show
    render json: current_order.to_json(include: [{ print_order_items: { include: [:document, :product] }, selected_partner: { include: :active_partner_products } }, :user, :invoice])
  end

  def update
    current_order.update(order_params)
    render json: current_order.to_json(include: :selected_partner)
  end

  private

  def order_params
    params.require(:print_order).permit(:selected_partner_id, :agreed_to_terms_and_conditions)
  end
end
