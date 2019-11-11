# frozen_string_literal: true

class Api::V1::InvoicesController < ApplicationController
  before_action :authenticate_user!

  def show
    invoice = current_user.invoices.find(params[:id])
    if invoice.top_up_order_invoice?
      render json: invoice.to_json(include: [{ order_items: { include: %i[product] } }, :order, :user])
    elsif invoice.print_order_invoice?
      render json: invoice.to_json(include: [{ order_items: { include: %i[product document] } }, :order, :user])
    end
  end
end
