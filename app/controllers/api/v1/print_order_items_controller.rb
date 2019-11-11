class Api::V1::PrintOrderItemsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def create
    print_order_item = current_order.print_order_items.create(
      print_product: PrintProduct.a4_black_and_white,
      document_id: params[:document_id]
    )
    render json: print_order_item.to_json(include: [:order, :document])
  end

  def destroy
    print_order_item = current_person.print_order_items.find(params[:id])
    print_order_item.destroy
    render json: print_order_item.to_json(include: :order)
  end

  def update
    print_order_item = current_person.print_order_items.find(params[:id])
    print_order_item.update(print_order_item_params)
    render json: print_order_item.to_json(include: :order)
  end

  private

  def print_order_item_params
    params.require(:print_order_item).permit(:product_id, :quantity, :document_id)
  end
end
