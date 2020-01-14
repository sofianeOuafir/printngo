# frozen_string_literal: true

class PartnerApplication < ApplicationRecord
  has_one :partner
  has_one_attached :contract

  validates_presence_of :firstname
  validates_presence_of :lastname
  validates_presence_of :email
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates_presence_of :company_name
  validates_presence_of :postcode
  validates_presence_of :company_address
  validates_presence_of :phone_number
  validates_presence_of :bank_details

  scope :with_partner, -> { where(id: Partner.all.map(&:partner_application_id)) }
  scope :archived, -> { where(archived: true).or(with_partner) }
  scope :not_archived, -> { where.not(id: archived.map(&:id)) }

  def partner_created?
    partner.present?
  end

  def contract_url
    contract.attached? ? contract.service_url : nil
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:partner_created] = partner_created?
    h[:contract_url] = contract_url
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:partner_created] = partner_created?
    h[:contract_url] = contract_url
    h
  end
end
