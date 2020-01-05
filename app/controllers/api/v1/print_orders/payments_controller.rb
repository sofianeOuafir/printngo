# frozen_string_literal: true

class Api::V1::PrintOrders::PaymentsController < ApplicationController
  wrap_parameters :payment, include: [:token]
  before_action :authenticate_user!

  def create
    if !current_order.paid?
      begin
        ActiveRecord::Base.transaction do
          if current_user.wallet_balance < current_order.total
            charge = Stripe::Charge.create(amount: current_order.total,
                                           currency: 'cad',
                                           source: params['payment']['token'])
            payment = current_order.create_stripe_payment(amount: charge.amount, stripe_id: charge.id)
          else
            payment = current_order.create_credit_payment(amount: current_order.total)
            payment.create_debit(amount: payment.amount, user: current_user)
          end
          SendgridMailer.print_order_confirmed_email(current_order)
          payment.create_invoice
          DeliverablesCreationJob.perform_later(current_order)
          current_order.update(paid: true, agreed_to_terms_and_conditions: true)
          current_user.print_orders.update_all(archived: true)
          payment.reload
          render json: payment.to_json(include: { order: { include: :user } })
        end
      rescue Stripe::CardError => e
        render json: I18n.translate("stripe.errors.#{e.code}").to_json, status: e.http_status
      rescue Stripe::RateLimitError => e
        # Too many requests made to the API too quickly
        render json: I18n.translate("stripe.errors.#{e.code}").to_json, status: e.http_status
      rescue Stripe::InvalidRequestError => e
        # Invalid parameters were supplied to Stripe's API
        render json: I18n.translate("stripe.errors.#{JSON.parse(e.http_body)["error"]["code"]}").to_json, status: e.http_status
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
      rescue StandardError => e
        # Something else happened, completely unrelated to Stripe
        render json: I18n.translate('controllers.print_orders.payments.create.something_went_wrong'), status: 500
      end
    else
      render json: I18n.translate('controllers.print_orders.payments.create.order_already_paid'), status: 403
    end
  end
end
