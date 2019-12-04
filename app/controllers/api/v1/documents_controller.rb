# frozen_string_literal: true

class Api::V1::DocumentsController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    render json: current_user.documents.order(created_at: :desc).to_json
  end

  def show
    render json: current_person.documents.find(params[:id]).to_json
  end
end
