class Payment < ApplicationRecord
  belongs_to :order
  has_one :invoice
end
