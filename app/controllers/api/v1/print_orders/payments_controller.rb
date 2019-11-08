class Api::V1::PrintOrders::PaymentsController < ApplicationController
  wrap_parameters :payment, include: [:token]
  before_action :authenticate_user!

  def create
    if !current_order.paid?
      begin
        current_order_before_update = current_order
        charge = Stripe::Charge.create(amount: current_order.total,
                                       currency: 'cad',
                                       source: params['payment']['token'])
        ActiveRecord::Base.transaction do
          SendgridMailer.order_confirmed_email(current_order)
          current_order.update(agreed_to_terms_and_conditions: true)
          payment = current_order.create_payment(amount: charge.amount, stripe_id: charge.id)
          payment.create_invoice
          current_order.print_order_items.group_by(&:product_id).each do |product_id, order_items|
            combined_file = CombinePDF.new
            order_items.each do |order_item|
              file = CombinePDF.parse(Net::HTTP.get_response(URI.parse(order_item.document.file.service_url)).body)
              (1..order_item.quantity).each do
                combined_file << file
              end
            end
            filename = "#{current_order.id}_#{product_id}"
            pathname = Rails.root.join("tmp/#{filename}")
            combined_file.save pathname.to_s
            deliverable = current_order.deliverables.new(product_id: product_id)
            deliverable.file.attach(io: open(pathname), filename: filename, content_type: 'application/pdf')
            deliverable.save
          end
          current_order.update_columns(paid: true)
          current_user.print_orders.update_all(archived: true)
          payment.reload
          render json: payment.to_json(include: { order: { include: :user } })
        end
        current_order_before_update.deliverables.each do |deliverable|
          o = open(deliverable.file.service_url)
          reader = PDF::Reader.new(o)
          deliverable.update_columns(number_of_page: reader.page_count)
        end
      rescue Stripe::CardError => e
        render json: e.message.to_json, status: e.http_status
      rescue Stripe::RateLimitError => e
        # Too many requests made to the API too quickly
        render json: e.message.to_json, status: e.http_status
      rescue Stripe::InvalidRequestError => e
        # Invalid parameters were supplied to Stripe's API
        render json: e.message.to_json, status: e.http_status
      rescue Stripe::AuthenticationError => e
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        render json: e.message.to_json, status: e.http_status
      rescue Stripe::APIConnectionError => e
        # Network communication with Stripe failed
        render json: e.message.to_json, status: e.http_status
      rescue Stripe::StripeError => e
        # Display a very generic error to the user, and maybe send
        # yourself an email
        render json: e.message.to_json, status: e.http_status
      rescue => e
        # Something else happened, completely unrelated to Stripe
        render json: 'Oops! Sorry, something went wrong... We are doing our best to solve the problem!', status: 500
      end
    else
      render json: 'Order has already been paid.', status: 403
    end
  end
end
