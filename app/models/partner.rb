class Partner < ApplicationRecord
  class <<self
    attr_accessor :user_position
  end

  reverse_geocoded_by :lat, :lng

  def distance_to_user_position
    distance_to(Partner.user_position)
  end

  private

  attr_accessor :user_position
end
