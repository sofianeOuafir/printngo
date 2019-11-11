# frozen_string_literal: true

class Api::V1::Users::TopUpOrdersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.top_up_orders.paid.order(created_at: :desc).to_json(include: %i[payment invoice])
  end

  def show
    top_up_order = current_user.top_up_orders.find(params[:id])
    render json: top_up_order.to_json(include: %i[invoice payment user])
  end
end
