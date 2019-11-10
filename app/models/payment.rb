class Payment < ApplicationRecord
  belongs_to :order
  has_one :user, through: :order
  has_one :invoice
end
