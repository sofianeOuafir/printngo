class PrintingAttempt < ApplicationRecord
  belongs_to :partner
  belongs_to :deliverable
  has_one :print_order, through: :deliverable
end
