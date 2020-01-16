# frozen_string_literal: true

class Api::V1::Partners::PromotionsController < ApplicationController
  before_action :authenticate_partner!

  def update
    promotion = current_partner.promotions.first_or_create
    if promotion.update(partner_params)
      render json: promotion.to_json(include: :partner)
    else
      render json: { errors: promotion.errors.to_json }, status: 400
    end
  end

  private

  def partner_params
    params.require(:promotion).permit(:text, :link)
  end
end
