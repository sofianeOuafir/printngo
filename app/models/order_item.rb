class OrderItem < ApplicationRecord
  belongs_to :product
  belongs_to :document
  belongs_to :order
end
