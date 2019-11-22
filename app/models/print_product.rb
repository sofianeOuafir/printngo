class PrintProduct < Product
  def self.a4_black_and_white
    PrintProduct.find_by(name: 'A4 Black')
  end

  def self.a4_color
    PrintProduct.find_by(name: 'A4 Color')
  end

  has_many :print_order_items, class_name: 'PrintOrderItem', foreign_key: 'product_id'
end
