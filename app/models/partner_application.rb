class PartnerApplication < ApplicationRecord
  belongs_to :partner, optional: true

  validates_presence_of :firstname
  validates_presence_of :lastname
  validates_presence_of :email
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates_presence_of :company_name
  validates_presence_of :postcode
  validates_presence_of :company_address
end
