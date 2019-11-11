class Api::V1::PrintProductsController < ApplicationController
  def index
    print_products = PrintProduct.all
    render json: print_products.to_json
  end
end
