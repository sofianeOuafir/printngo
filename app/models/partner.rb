class Partner < ApplicationRecord
  class <<self
    attr_accessor :user_position
  end

  has_many :expected_orders, foreign_key: "selected_partner_id", class_name: "Order"

  reverse_geocoded_by :lat, :lng

  def distance_to_user_position
    distance_to(Partner.user_position)
  end

  private

  attr_accessor :user_position
end
