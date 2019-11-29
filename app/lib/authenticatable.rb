module Authenticatable
  extend ActiveSupport::Concern

  included do |klass|
    klass.extend(ClassMethods)
    before_validation :strip_email
    validates :password, presence: true, confirmation: true
    validates_confirmation_of :password
    validates_uniqueness_of :email
    validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
    validates_presence_of :email
    validates_presence_of :firstname
    validates_presence_of :lastname
    before_save :encrypt_password
    before_save :titleize_fullname
    before_save :strip_fullname
    before_save :downcase_email
  end

  module ClassMethods
    def authenticate(email, password)
      user = find_by_email(email.downcase)
      if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
        user
      end
    end
  end

  attr_accessor :password

  def fullname
    "#{firstname} #{lastname}"
  end

  def as_json(options = {})
    h = super(options).except!('password_hash', 'password_salt', 'created_at', 'updated_at')
    h[:fullname] = fullname
    h
  end

  def serializable_hash(options = {})
    h = super(options).except!('password_hash', 'password_salt', 'created_at', 'updated_at')
    h[:fullname] = fullname
    h
  end

  private

  def titleize_fullname
    self.firstname = firstname.titleize
    self.lastname = lastname.titleize
  end

  def strip_fullname
    self.firstname = firstname.strip
    self.lastname = lastname.strip
  end

  def strip_email
    self.email = email.strip
  end

  def downcase_email
    self.email = email.downcase
  end

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end
end
