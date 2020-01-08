class Partner < ApplicationRecord
  include Authenticatable

  class <<self
    attr_accessor :user_position
  end

  has_many :printed_orders, foreign_key: "printer_id", class_name: "PrintOrder"
  has_many :printing_attempts
  has_many :deliverables, through: :printing_attempts
  has_many :print_orders, -> { distinct }, through: :deliverables
  has_many :activations

  validates_presence_of :phone_number
  validates_presence_of :bank_details

  scope :activated, -> { where(activated: true) }

  reverse_geocoded_by :lat, :lng

  def distance_to_user_position
    distance_to(Partner.user_position)
  end

  attr_accessor :user_position
end
