class Transaction < ApplicationRecord
  belongs_to :user

  validates_presence_of :amount
end
