class Api::V1::Partners::PartnerProductsController < ApplicationController
  before_action :authenticate_partner!

  def index
    render json: current_partner.partner_products.order(created_at: :asc).to_json
  end

  def update
    partner_product = PartnerProduct.find(params[:id])
    if partner_product.update(partner_product_params)
      render json: partner_product.to_json
    else
      render json: { errors: partner_product.errors.to_json }, status: 400
    end
  end

  private

  def partner_product_params
    params.require(:partner_product).permit(:name, :description, :price, :active, :link)
  end
end
