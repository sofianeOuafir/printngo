# frozen_string_literal: true

class Api::V1::TopUpOrdersController < ApplicationController
  def show
    top_up_order = TopUpOrder.find(params[:id])
    render json: top_up_order.to_json(include: %i[invoice payment user])
  end
end
