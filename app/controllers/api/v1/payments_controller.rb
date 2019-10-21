class Api::V1::PaymentsController < ApplicationController 
  wrap_parameters :payment, include: [:token]
  before_action :authenticate_user!

  def create
    if !current_order.paid?
      begin
        charge = Stripe::Charge.create(amount: current_order.total,
                                       currency: 'cad',
                                       source: params['payment']['token'])
        payment = current_order.create_payment(amount: charge.amount, stripe_id: charge.id)
        payment.create_invoice
        SendgridMailer.order_confirmed_email(current_order)
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
