class User < ApplicationRecord
  include Authenticatable

  has_many :visits
  has_many :orders
  has_many :top_up_orders, class_name: 'TopUpOrder', foreign_key: 'user_id'
  has_many :print_orders, class_name: 'PrintOrder', foreign_key: 'user_id'
  has_many :documents
  has_many :order_items, through: :orders
  has_many :print_order_items, through: :print_orders, source: 'print_order_items'
  has_many :top_up_order_items, through: :top_up_orders, source: 'top_up_order_items'
  has_many :invoices, through: :orders
  has_many :transactions
  has_many :credits, class_name: 'Credit', foreign_key: 'user_id'
  has_many :debits, class_name: 'Debit', foreign_key: 'user_id'

  def wallet_balance
    credits.sum(:amount) - debits.sum(:amount)
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:wallet_balance] = wallet_balance
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:wallet_balance] = wallet_balance
    h
  end
end
