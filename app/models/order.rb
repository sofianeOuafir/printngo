# frozen_string_literal: true

class Order < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :visit, optional: true
  has_many :order_items
  has_many :print_order_item, class_name: 'PrintOrderItem', foreign_key: 'order_id'
  has_many :top_up_order_item, class_name: 'TopUpOrderItem', foreign_key: 'order_id'
  has_one :payment
  has_one :invoice, through: :payment

  scope :paid, -> { where(paid: true) }
  scope :unpaid, -> { where(paid: false) }

  def print_order?
    type == 'PrintOrder'
  end

  def top_up_order?
    type == 'TopUpOrder'
  end

  def sub_total
    if print_order?
      print_order_item.sum(&:sub_total)
    else
      top_up_order_item.sum(&:sub_total)
    end
  end

  def number_of_items
    if print_order?
      print_order_item.sum(:quantity)
    else
      top_up_order_item.sum(:quantity)
    end
  end

  def tax_amount
    sub_total * 13 / 100
  end

  def total
    sub_total * 113 / 100
  end

  def total_paid
    payment.try(:amount) || 0
  end

  def total_due
    total - total_paid
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h[:total] = total
    h[:tax_amount] = tax_amount
    h[:number_of_items] = number_of_items
    h[:total_paid] = total_paid
    h[:total_due] = total_due
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h[:total] = total
    h[:tax_amount] = tax_amount
    h[:number_of_items] = number_of_items
    h[:total_paid] = total_paid
    h[:total_due] = total_due
    h
  end
end
