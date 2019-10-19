class Api::V1::InvoicesController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: current_user.invoices.find(params[:id]).to_json(include: [{ order_items: { include: [:product, :document] } }, :order])
  end
end
