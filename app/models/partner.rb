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
  has_many :promotions
  has_many :partner_products
  has_one_attached :contract

  validates_presence_of :phone_number
  validates_presence_of :bank_details
  validates_presence_of :contract

  scope :activated, -> { where(activated: true) }

  after_create :create_partner_products

  reverse_geocoded_by :lat, :lng

  def distance_to_user_position
    distance_to(Partner.user_position)
  end

  def promotion_text
    promotions.present? ? promotions.first.text : ''
  end

  def promotion_link
    promotions.present? ? promotions.first.link : ''
  end

  def contract_url
    contract.attached? ? contract.service_url : nil
  end

  def as_json(options = {})
    h = super(options)
    h[:promotion_text] = promotion_text
    h[:promotion_link] = promotion_link
    h[:contract_url] = contract_url
    h
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:promotion_text] = promotion_text
    h[:promotion_link] = promotion_link
    h[:contract_url] = contract_url
    h
  end

  attr_accessor :user_position

  private 

  def create_partner_products
    3.times { partner_products.create }
  end
end
