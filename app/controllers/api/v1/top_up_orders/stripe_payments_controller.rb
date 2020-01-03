# frozen_string_literal: true

class Api::V1::TopUpOrders::StripePaymentsController < ApplicationController
  wrap_parameters :stripe_payment, include: [:token]
  before_action :authenticate_user!

  def create
    ActiveRecord::Base.transaction do
      top_up_product = TopUpProduct.find(params[:product_id])
      top_up_order = TopUpOrder.create(user: current_user)
      top_up_order.top_up_order_items.create(top_up_product: top_up_product, quantity: 1)

      charge = Stripe::Charge.create(amount: top_up_order.total,
                                     currency: 'cad',
                                     source: params['stripe_payment']['token'])
      top_up_order.update(paid: true, agreed_to_terms_and_conditions: true)
      stripe_payment = top_up_order.create_stripe_payment(amount: charge.amount, stripe_id: charge.id)
      stripe_payment.create_invoice
      stripe_payment.create_credit(amount: top_up_product.allocated_credit, user: current_user)
      SendgridMailer.top_up_order_confirmed_email(top_up_order)
      render json: stripe_payment.to_json(include: %i[user order])
    end
  rescue Stripe::CardError => e
    render json: I18n.translate("stripe.errors.#{e.code}").to_json, status: e.http_status
  rescue Stripe::RateLimitError => e
    # Too many requests made to the API too quickly
    render json: I18n.translate("stripe.errors.#{e.code}").to_json, status: e.http_status
  rescue Stripe::InvalidRequestError => e
    # Invalid parameters were supplied to Stripe's API
    render json: I18n.translate("stripe.errors.#{e.code}").to_json, status: e.http_status
  rescue Stripe::AuthenticationError => e
    # Authentication with Stripe's API failed
    # (maybe you changed API keys recently)
    render json: I18n.translate("stripe.errors.#{e.code}").to_json, status: e.http_status
  rescue Stripe::APIConnectionError => e
    # Network communication with Stripe failed
    render json: I18n.translate("stripe.errors.#{e.code}").to_json, status: e.http_status
  rescue Stripe::StripeError => e
    # Display a very generic error to the user, and maybe send
    # yourself an email
    render json: I18n.translate("stripe.errors.#{e.code}").to_json, status: e.http_status
  rescue ActiveRecord::RecordNotFound => e
    render json: I18n.translate('controllers.top_up_orders.stripe_payments.create.record_not_found'), status: 404
  rescue StandardError => e
    # Something else happened, completely unrelated to Stripe
    render json: I18n.translate('controllers.top_up_orders.stripe_payments.create.something_went_wrong'), status: 500
  end
end
