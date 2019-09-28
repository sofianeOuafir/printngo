class OrderItem < ApplicationRecord
  belongs_to :product
  belongs_to :document
  belongs_to :order

  before_save :change_price

  def sub_total
    document.number_of_page * quantity * price
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h
  end

  private

  def change_price
    return unless product_id_changed?
    self.price = product.price
  end
end
