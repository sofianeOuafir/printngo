class Api::V1::Orders::DocumentsController < ApplicationController
  def create
    if current_user
      puts 'yo'
      byebug
    elsif current_visit
      order = current_order
      document = Document.create
      document.file.attach(params[:file])
      product = Product.where(format: 'A4', color: false).first
      order.order_items.create(product_id: product.id, document_id: document.id, quantity: 1, price: product.price)
    end
  end
end
