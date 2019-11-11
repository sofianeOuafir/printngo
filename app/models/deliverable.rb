class Deliverable < ApplicationRecord
  has_one_attached :file

  belongs_to :print_product, class_name: 'PrintProduct', foreign_key: 'product_id'
  belongs_to :print_order, class_name: 'PrintOrder', foreign_key: 'order_id'
  has_many :printing_attempts

  def printing_attempted?
    printing_attempts.present?
  end
end
