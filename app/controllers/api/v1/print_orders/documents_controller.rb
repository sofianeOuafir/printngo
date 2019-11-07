class Api::V1::PrintOrders::DocumentsController < ApplicationController
  def create
    begin
      pdf = PdfConverter.new(params[:file]).process
      order = current_order
      document = Document.new(user_id: current_user.try(:id))
      document.file.attach(io: pdf[:file], filename: pdf[:filename], content_type: pdf[:type])
      document.save
      o = open(document.file.service_url)
      reader = PDF::Reader.new(o)
      document.update_columns(number_of_page: reader.page_count)
      print_product = PrintProduct.a4_black_and_white
      print_order_item = order.print_order_items.create(
        print_product: print_product,
        document_id: document.id,
        price: print_product.price
      )
      render json: print_order_item.to_json(include: [:document, :order])
    rescue ArgumentError => e
      render json: e.message, status: 415
    end
  end
end
