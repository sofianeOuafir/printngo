class OrderItem < ApplicationRecord
  belongs_to :product
  belongs_to :order
  validates_numericality_of :quantity, greater_than_or_equal_to: 0

  before_save :change_price
  after_save :destroy_order_item_if_quantity_is_zero

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

  def destroy_order_item_if_quantity_is_zero
    return unless quantity.zero?

    destroy
  end

  def change_price
    return unless product_id_changed?
    self.price = product.price
  end
end
