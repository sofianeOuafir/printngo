# frozen_string_literal: true

class Api::V1::Partners::ActivationsController < ApplicationController
  wrap_parameters :activation, include: [:password, :password_confirmation, :activated]

  def show
    activation = Activation.not_activated.find_by(token: params[:id])
    if activation.present?
      render json: activation.to_json(include: :partner)
    else
      render json: {}, status: 404
    end
  end

  def update
    activation = Activation.not_activated.find_by(token: params[:id])
    if activation.update(activation_params)
      render json: activation.to_json
    else
      render json: { errors: activation.errors.to_json }, status: 400
    end
  end

  private

  def activation_params
    params.require(:activation).permit(:password, :password_confirmation, :activated)
  end
end
