class Api::V1::Orders::DocumentsController < ApplicationController
  def create
    if current_user
    elsif current_visit
      order = current_order
      document = Document.new
      document.file.attach(params[:file])
      document.save
      product = Product.a4_black_and_white
      order.order_items.create(product_id: product.id, document_id: document.id, quantity: 1, price: product.price)
    end
  end
end
