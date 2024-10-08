# frozen_string_literal: true

class Order < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :visit, optional: true
  has_many :order_items
  has_many :print_order_items, class_name: 'PrintOrderItem', foreign_key: 'order_id'
  has_many :top_up_order_items, class_name: 'TopUpOrderItem', foreign_key: 'order_id'
  has_one :payment
  has_one :stripe_payment, class_name: 'StripePayment', foreign_key: 'order_id'
  has_one :credit_payment, class_name: 'CreditPayment', foreign_key: 'order_id'
  has_one :invoice, through: :payment

  after_save :persist_tax_amount_paid

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
      print_order_items.sum(&:sub_total)
    else
      top_up_order_items.sum(&:sub_total)
    end
  end

  def number_of_items
    if print_order?
      print_order_items.sum(:quantity)
    else
      top_up_order_items.sum(:quantity)
    end
  end

  def tax_amount
    tax_amount_paid.present? ? tax_amount_paid : sub_total * I18n.translate('tax_amount') / 100
  end

  def total
    sub_total + tax_amount
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
    h[:print_order] = print_order?
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
    h[:print_order] = print_order?
    h
  end

  private

  def persist_tax_amount_paid
    return unless saved_changes[:paid].present? && paid?

    update_columns(tax_amount_paid: tax_amount)
  end
end
