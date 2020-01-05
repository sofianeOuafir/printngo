class PrintProduct < Product
  def self.a4_black_and_white
    PrintProduct.find_by(code: 'printProduct1')
  end

  def self.a4_color
    PrintProduct.find_by(code: 'printProduct2')
  end

  has_many :print_order_items, class_name: 'PrintOrderItem', foreign_key: 'product_id'
end
