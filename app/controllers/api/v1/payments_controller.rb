class Api::V1::PaymentsController < ApplicationController 
  wrap_parameters :payment, include: [:token]
  
  def create
    begin
      charge = Stripe::Charge.create({
        amount: current_order.total,
        currency: 'cad',
        source: params["payment"]["token"], # obtained with Stripe.js
      })
      payment = current_order.create_payment(amount: charge.amount, stripe_id: charge.id)
      current_order.update_columns(paid: true)
      payment.reload
      render json: payment.to_json(include: { order: { include: :user } })
    rescue => e
      render json: e.to_json, status: e.http_status
    end
  end
end
