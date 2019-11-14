class Api::V1::PrintOrders::DocumentsController < ApplicationController
  def create
    begin
      pdf = PdfConverter.new(params[:file]).process
      document = Document.new(user_id: current_user.try(:id))
      document.file.attach(io: pdf[:file], filename: pdf[:filename], content_type: pdf[:type])
      if document.save && document.number_of_page.present?
        print_product = PrintProduct.a4_black_and_white
        print_order_item = current_order.print_order_items.create(
          print_product: print_product,
          document_id: document.id,
          price: print_product.price
        )
        render json: print_order_item.to_json(include: [:document, :order])
      else
        document.destroy if document.persisted?
        render json: 'File format not supported. Please convert your file into PDF and try again!', status: 415
      end
    rescue PDF::Reader::MalformedPDFError
      render json: 'File format not supported. Please convert your file into PDF and try again!', status: 415
    rescue ArgumentError => e
      render json: e.message, status: 415
    rescue StandardError
      render json: 'File format not supported. Please convert your file into PDF and try again!', status: 415  
    end
  end
end
