# frozen_string_literal: true

class TopUpOrderItem < OrderItem
  belongs_to :top_up_product, class_name: 'TopUpProduct', foreign_key: 'product_id'
  belongs_to :top_up_order, class_name: 'TopUpOrder', foreign_key: 'order_id'

  def sub_total
    quantity * price
  end

  private

  def set_description
    self.description = top_up_product.code
  end
end
