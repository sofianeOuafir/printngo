class Api::V1::Users::TransactionsController < ApplicationController 
  before_action :authenticate_user!

  def index
    render json: current_user.transactions.order(created_at: :desc).to_json(include: :order)
  end
end
