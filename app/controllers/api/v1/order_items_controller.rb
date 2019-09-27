class Api::V1::OrderItemsController < ApplicationController
  def destroy
    #verify that only current_visitor can destory order item
    order_item = OrderItem.find(params[:id])
    order_item.destroy
    render json: order_item.to_json
  end
end
