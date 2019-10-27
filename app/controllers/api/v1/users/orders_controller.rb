class Api::V1::Users::OrdersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.orders.paid.order(:created_at).to_json(include: [:payment, :invoice])
  end

  def show
    render json: current_user.orders.find(params[:id]).to_json(include: [{ order_items: { include: [:document, :product] } }, :selected_partner, :user, :invoice])
  end
end
