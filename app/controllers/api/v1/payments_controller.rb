class Api::V1::PaymentsController < ApplicationController 
  def create
    begin
      charge = Stripe::Charge.create({
        amount: current_order.total,
        currency: 'cad',
        source: params["payment"]["token"], # obtained with Stripe.js
      })
      current_order.update_columns(paid: true)
      render json: charge.to_json
    rescue => e
      render json: e.to_json, status: e.http_status
    end
  end
end
