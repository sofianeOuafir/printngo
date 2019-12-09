class ApplicationController < ActionController::Base
  helper_method :current_user, :current_order, :current_partner, :current_person

  private

  def authenticate_user!
    return if current_user.present?

    render json: {
      error: 'Unauthorized'
    }, status: 401
  end

  def authenticate_partner!
    return if current_partner.present?

    render json: {
      error: 'Unauthorized'
    }, status: 401
  end

  def authenticate_admin!
    return if current_admin.present?

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

  def current_partner
    @current_partner ||= Partner.find(session[:partner_id]) if session[:partner_id]
  end

  def current_admin
    @current_admin ||= Admin.find(session[:admin_id]) if session[:admin_id]
  end

  def current_order
    current_person.print_orders.unpaid.unarchived.order(created_at: :desc).first ||
      current_person.print_orders.create(ahoy_visit_id: current_visit.id)
  end
end
