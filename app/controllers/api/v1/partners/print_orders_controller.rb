class Api::V1::Partners::PrintOrdersController < ApplicationController
  before_action :authenticate_partner!

  def index
    render json: current_partner.print_orders.order(created_at: :desc).to_json(include: [{ deliverables: { include: [:print_product, :printing_attempts] } }, :user])
  end

  def show
    print_order = PrintOrder.searchable_by_partner.find_by(secret_code: params[:id])
    if print_order.present?
      render json: print_order.to_json(include: [{deliverables: { include: [:print_product, :printing_attempts] }}, :user]), status: 200
    else
      render json: {}, status: 404
    end
  end

  def update
    print_order = PrintOrder.searchable_by_partner.find_by(secret_code: params[:id])
    print_order.update(printer_id: current_partner.id)
    print_order.reload
    render json: print_order.to_json(include: [{deliverables: { include: [:print_product, :printing_attempts] }}, :user]), status: 200
  end

  private

  def order_params
    params.require(:print_order).permit(:printer_id)
  end
end
