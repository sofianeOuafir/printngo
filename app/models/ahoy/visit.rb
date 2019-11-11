class Ahoy::Visit < ApplicationRecord
  self.table_name = "ahoy_visits"

  has_many :events, class_name: "Ahoy::Event"
  belongs_to :user, optional: true
  has_many :orders, foreign_key: :ahoy_visit_id
  has_many :top_up_orders, class_name: 'TopUpOrder', foreign_key: 'ahoy_visit_id'
  has_many :print_orders, class_name: 'PrintOrder', foreign_key: 'ahoy_visit_id'
  has_many :documents, foreign_key: :ahoy_visit_id
  has_many :order_items, through: :orders
  has_many :print_order_items, through: :print_orders, source: 'print_order_item'
  has_many :top_up_order_items, through: :top_up_orders, source: 'top_up_order_item'

  before_update :assign_documents_to_user
  before_update :assign_orders_to_user

  private

  def assign_documents_to_user
    return unless user_id_changed?

    documents.update_all(user_id: user_id)
  end

  def assign_orders_to_user
    return unless user_id_changed?

    orders.each { |order| order.update(user_id: user_id) }
  end
end
