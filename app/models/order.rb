class Order < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :partner, optional: true
  belongs_to :visit, optional: true
  has_many :order_items
  has_one :payment

  scope :paid, -> { where(paid: true) }
  scope :unpaid, -> { where(paid: false) }
  scope :archived, -> { where(archived: true) }
  scope :unarchived, -> { where(archived: false) }

  def sub_total
    order_items.sum(&:sub_total)
  end

  def number_of_items
    order_items.sum(:quantity)
  end

  def tax_amount
    sub_total * 13 / 100
  end

  def total
    sub_total * 113 / 100
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h[:total] = total
    h[:tax_amount] = tax_amount
    h[:number_of_items] = number_of_items
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h[:total] = total
    h[:tax_amount] = tax_amount
    h[:number_of_items] = number_of_items
    h
  end
end
