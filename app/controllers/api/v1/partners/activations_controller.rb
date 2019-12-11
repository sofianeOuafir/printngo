# frozen_string_literal: true

class Api::V1::Partners::ActivationsController < ApplicationController
  def show
    activation = Activation.not_activated.find_by(token: params[:id])
    if activation.present?
      render json: activation.to_json(include: :partner)
    else
      render json: {}, status: 404
    end
  end
end
