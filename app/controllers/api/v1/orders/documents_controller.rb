class Api::V1::Orders::DocumentsController < ApplicationController
  def create
    order = current_order
    document = Document.new(user_id: current_user.try(:id))
    document.file.attach(params[:file])
    document.save
    o = open(document.file.service_url)
    reader = PDF::Reader.new(o)
    document.update_columns(number_of_page: reader.page_count)
    product = Product.a4_black_and_white
    order_item = order.order_items.create(
      product_id: product.id,
      document_id: document.id,
      price: product.price
    )
    render json: order_item.to_json(include: [:document, :order])
  end
end
