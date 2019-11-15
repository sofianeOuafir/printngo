class Deliverable < ApplicationRecord
  # after_create_commit must come before has_one_attached :file
  after_create_commit :set_number_of_page
  has_one_attached :file

  belongs_to :print_product, class_name: 'PrintProduct', foreign_key: 'product_id'
  belongs_to :print_order, class_name: 'PrintOrder', foreign_key: 'order_id'
  has_many :printing_attempts, dependent: :destroy

  def printing_attempted?
    printing_attempts.present?
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:printed] = print_order.printed?
    h[:awaiting_confirmation] = print_order.awaiting_confirmation
    h[:preparing] = print_order.preparing?
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:printed] = print_order.printed?
    h[:awaiting_confirmation] = print_order.awaiting_confirmation
    h[:preparing] = print_order.preparing?
    h
  end


  private

  def set_number_of_page
    o = open(file.service_url)
    reader = PDF::Reader.new(o)
    update_columns(number_of_page: reader.page_count)
  end
end
