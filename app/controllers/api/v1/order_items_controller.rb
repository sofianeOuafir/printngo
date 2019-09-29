class Api::V1::OrderItemsController < ApplicationController
  #verify that only current_visitor or current_user can destory/update order item

  def destroy
    order_item = OrderItem.find(params[:id])
    order_item.destroy
    render json: order_item.to_json(include: :order)
  end

  def update
    order_item = OrderItem.find(params[:id])
    order_item.update(order_item_params)
    render json: order_item.to_json(include: :order)
  end

  private

  def order_item_params
    params.require(:order_item).permit(:product_id, :quantity)
  end
end
