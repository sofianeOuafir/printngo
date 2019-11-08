class SellingPoint < ApplicationRecord
  belongs_to :top_up_product, class_name: 'Product', foreign_key: 'product_id'
end
