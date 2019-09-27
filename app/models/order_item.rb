class OrderItem < ApplicationRecord
  belongs_to :product
  belongs_to :document
  belongs_to :order

  def sub_total
    quantity * price
  end

  def as_json(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h
  end
end
