class Api::V1::ProductsController < ApplicationController
  def index
    products = Product.all
    render json: products.to_json
  end
end
