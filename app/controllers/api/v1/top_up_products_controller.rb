class Api::V1::TopUpProductsController < ApplicationController
  def index
    top_up_products = TopUpProduct.all
    render json: top_up_products.to_json(include: :selling_points)
  end
end
