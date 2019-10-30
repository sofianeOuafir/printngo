class Deliverable < ApplicationRecord
  has_one_attached :file
  
  belongs_to :product
  belongs_to :order
end
