class Api::V1::OrderItemsController < ApplicationController
  def destroy
    #verify that only current_visitor can destory order item
    order_item = OrderItem.find(params[:id])
    order_item.destroy
    render json: order_item.to_json
  end

  def update
    order_item = OrderItem.find(params[:id])
    order_item.update(order_item_params)
    render json: order_item.to_json
  end

  private

  def order_item_params
    params.require(:order_item).permit(:product_id, :quantity)
  end
end
