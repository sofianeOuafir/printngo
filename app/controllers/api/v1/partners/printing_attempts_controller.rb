class Api::V1::Partners::PrintingAttemptsController < ApplicationController
  before_action :authenticate_partner!

  def create
    print_order = PrintOrder.searchable_by_partner.find_by(secret_code: params[:secret_code])
    deliverable = print_order.deliverables.find(params[:id])
    printing_attempt = current_partner.printing_attempts.create(deliverable_id: deliverable.id)
    render json: printing_attempt.to_json
  end

  private

  def printing_attempts_params
    params.require(:printing_attempt).permit(:id)
  end
end
