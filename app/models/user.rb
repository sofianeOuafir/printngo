class User < ApplicationRecord
  include Authenticatable

  has_many :visits
  has_many :orders
  has_many :documents
  has_many :order_items, through: :orders
  has_many :invoices, through: :orders
end
