class User < ApplicationRecord
  has_many :visits
  has_many :orders

  attr_accessor :password
  before_save :encrypt_password

  validates_presence_of :password, on: :create
  validates_uniqueness_of :email
  validates_presence_of :email
  validates_presence_of :firstname
  validates_presence_of :lastname

  def self.authenticate(email, password)
    user = find_by_email(email)
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end

  def fullname 
    "#{firstname} #{lastname}"
  end

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
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
end
