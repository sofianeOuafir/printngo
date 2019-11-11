class Api::V1::Users::PrintOrdersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.print_orders.paid.order(created_at: :desc).to_json(include: [:payment, :invoice])
  end

  def show
    render json: current_user.print_orders.find(params[:id]).to_json(include: [{ order_items: { include: [:document, :product] } }, :selected_partner, :user, :invoice])
  end
end
