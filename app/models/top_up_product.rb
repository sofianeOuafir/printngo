# frozen_string_literal: true

class TopUpProduct < Product
  has_many :top_up_order_items, class_name: 'TopUpOrderItem', foreign_key: 'product_id'
end
