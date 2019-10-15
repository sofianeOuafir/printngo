class Api::V1::PaymentsController < ApplicationController 
  wrap_parameters :payment, include: [:token]

  def create
    if !current_order.paid?
      begin
        charge = Stripe::Charge.create(amount: current_order.total,
                                       currency: 'cad',
                                       source: params['payment']['token'])
        payment = current_order.create_payment(amount: charge.amount, stripe_id: charge.id)
        current_order.update_columns(paid: true)
        current_user.orders.update_all(archived: true)
        payment.reload
        render json: payment.to_json(include: { order: { include: :user } })
      rescue => e
        render json: e.to_json, status: e.http_status
      end
    else
      render json: 'Order has already been paid.', status: 403
    end
  end
end
