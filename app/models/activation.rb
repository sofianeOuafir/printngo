# frozen_string_literal: true

class Activation < ApplicationRecord
  belongs_to :partner

  before_create :generate_token
  after_create :send_activation_email
  after_update :activate_partner

  validates :password, presence: true, on: :update
  validates_confirmation_of :password, on: :update

  scope :not_activated, -> { where(activated: false) }

  attr_accessor :password

  private

  def generate_token
    self.token = SecureRandom.urlsafe_base64.to_s
  end

  def send_activation_email
    SendgridMailer.activation_email(email: partner.email,
                                    firstname: partner.firstname,
                                    token: token)
  end

  def activate_partner
    return unless saved_change_to_activated? && activated?

    if partner.update(activated: true,
                      password: password,
                      password_confirmation: password_confirmation)
      SendgridMailer.activation_confirmation_email(partner.email)
    end
  end
end
