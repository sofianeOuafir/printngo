# frozen_string_literal: true

class Invoice < ApplicationRecord
  belongs_to :payment
  has_one :order, through: :payment
  has_many :order_items, through: :order
  has_one :user, through: :order

  def top_up_order_invoice?
    order.type == 'TopUpOrder'
  end

  def print_order_invoice?
    order.type == 'PrintOrder'
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:print_order_invoice] = print_order_invoice?
    h[:top_up_order_invoice] = top_up_order_invoice?
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:print_order_invoice] = print_order_invoice?
    h[:top_up_order_invoice] = top_up_order_invoice?
    h
  end
end
