class Invoice < ApplicationRecord
  belongs_to :payment
  has_one :order, through: :payment
  has_many :order_items, through: :order
  has_one :user, through: :order
end
