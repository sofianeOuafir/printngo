# frozen_string_literal: true

class TopUpProduct < Product
  has_many :top_up_order_items, class_name: 'TopUpOrderItem', foreign_key: 'product_id'
  has_many :selling_points, class_name: 'SellingPoint', foreign_key: 'product_id'

  def self.ten_dollars_top_up
    TopUpProduct.find_by(name: '$9.99 Top up / On demand')
  end

  def self.twenty_dollars_top_up
    TopUpProduct.find_by(name: '$19.99 Top up / On demand')
  end

  def self.thirty_dollars_top_up
    TopUpProduct.find_by(name: '$29.99 Top up / On demand')
  end
end
