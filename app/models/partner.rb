class Partner < ApplicationRecord
  class <<self
    attr_accessor :user_position
  end

  has_many :expected_orders, foreign_key: "selected_partner_id", class_name: "Order"
  has_many :printed_orders, foreign_key: "printer_id", class_name: "Order"
  has_many :printing_attempts
  has_many :deliverables, through: :printing_attempts
  has_many :orders, -> { distinct }, through: :deliverables

  reverse_geocoded_by :lat, :lng

  attr_accessor :password
  before_save :encrypt_password
  before_save :titleize_name

  validates :password, presence: true, confirmation: true
  validates_confirmation_of :password
  validates_uniqueness_of :email
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates_presence_of :email
  validates_presence_of :firstname
  validates_presence_of :lastname

  def self.authenticate(email, password)
    partner = find_by_email(email)
    if partner && partner.password_hash == BCrypt::Engine.hash_secret(password, partner.password_salt)
      partner
    else
      nil
    end
  end

  def distance_to_user_position
    distance_to(Partner.user_position)
  end

  def fullname 
    "#{firstname} #{lastname}"
  end

  def as_json(options = {})
    h = super(options).except!("password_hash", "password_salt", "created_at", "updated_at")
    h[:fullname] = fullname
    h
  end

  def serializable_hash(options = {})
    h = super(options).except!("password_hash", "password_salt", "created_at", "updated_at")
    h[:fullname] = fullname
    h
  end

  private

  def titleize_name
    self.firstname = firstname.titleize
    self.lastname = lastname.titleize
  end

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  attr_accessor :user_position
end
