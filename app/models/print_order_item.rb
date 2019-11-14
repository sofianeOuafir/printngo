class PrintOrderItem < OrderItem
  belongs_to :document
  belongs_to :print_product, class_name: 'PrintProduct', foreign_key: 'product_id'
  belongs_to :print_order, class_name: 'PrintOrder', foreign_key: 'order_id'

  validate :belongs_to_document_with_number_of_page

  def sub_total
    document.number_of_page * quantity * price
  end

  private

  def belongs_to_document_with_number_of_page
    if document.present? && document.number_of_page.blank?
      errors.add(:document, "Document should have number of page set")
    end
  end

  def set_description
    self.description = document.name
  end
end
