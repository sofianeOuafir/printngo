class ApplicationController < ActionController::Base
  helper_method :current_user, :current_order
  skip_before_action :verify_authenticity_token

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_order
    if current_user
      current_user.orders.first_or_create
    elsif current_visit
      current_visit.orders.first_or_create
    end
  end
end
