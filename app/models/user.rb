class User < ApplicationRecord
  include Authenticatable

  has_many :visits
  has_many :orders
  has_many :top_up_orders, class_name: 'TopUpOrder', foreign_key: 'user_id'
  has_many :print_orders, class_name: 'PrintOrder', foreign_key: 'user_id'
  has_many :documents
  has_many :order_items, through: :orders
  has_many :print_order_items, through: :print_orders, source: 'print_order_item'
  has_many :top_up_order_items, through: :top_up_orders, source: 'top_up_order_item'
  has_many :invoices, through: :orders
end
