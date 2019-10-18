class ApplicationController < ActionController::Base
  helper_method :current_user, :current_order
  skip_before_action :verify_authenticity_token

  private

  def authenticate!
    return if current_user.present?
    render json: {
      error: 'Unauthorized'
    }, status: 401
  end

  def current_person
    current_user.present? ? current_user : current_visit
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_order
    current_person.orders.unpaid.unarchived.order(created_at: :desc).first || current_person.orders.create(ahoy_visit_id: current_visit.id)
  end
end
