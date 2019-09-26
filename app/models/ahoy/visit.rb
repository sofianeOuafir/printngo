class Ahoy::Visit < ApplicationRecord
  self.table_name = "ahoy_visits"

  has_many :events, class_name: "Ahoy::Event"
  belongs_to :user, optional: true
  has_many :orders, foreign_key: :ahoy_visit_id
  has_many :documents, foreign_key: :ahoy_visit_id
end
