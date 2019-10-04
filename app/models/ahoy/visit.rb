class Ahoy::Visit < ApplicationRecord
  self.table_name = "ahoy_visits"

  has_many :events, class_name: "Ahoy::Event"
  belongs_to :user, optional: true
  has_many :orders, foreign_key: :ahoy_visit_id
  has_many :documents, foreign_key: :ahoy_visit_id

  before_update :assign_documents_to_user
  before_update :assign_orders_to_user

  private

  def assign_documents_to_user
    return unless user_id_changed?
    documents.update_all(user_id: user_id)
  end

  def assign_orders_to_user
    return unless user_id_changed?
    orders.update_all(user_id: user_id)
  end
end
