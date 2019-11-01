class Deliverable < ApplicationRecord
  has_one_attached :file

  belongs_to :product
  belongs_to :order
  has_many :printing_attempts

  def printing_attempted?
    printing_attempts.present?
  end
end
