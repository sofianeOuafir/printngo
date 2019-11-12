class PrintOrderItem < OrderItem
  belongs_to :document
  belongs_to :print_product, class_name: 'PrintProduct', foreign_key: 'product_id'
  belongs_to :print_order, class_name: 'PrintOrder', foreign_key: 'order_id'

  def sub_total
    document.number_of_page * quantity * price
  end

  private

  def set_description
    self.description = document.name
  end
end
