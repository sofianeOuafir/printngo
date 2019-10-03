class Api::V1::DocumentsController < ApplicationController
  def show
    render json: Document.find(params[:id]).to_json
  end
end
