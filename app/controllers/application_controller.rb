class ApplicationController < ActionController::Base
  helper_method :current_user, :current_order
  skip_before_action :verify_authenticity_token

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_order
    if current_user
      current_user.orders.unpaid.unarchived.order(created_at: :desc).first || current_user.orders.create(ahoy_visit_id: current_visit.id)
    elsif current_visit
      current_visit.orders.unpaid.unarchived.order(created_at: :desc).first || current_visit.orders.create(ahoy_visit_id: current_visit.id)
    end
  end
end
