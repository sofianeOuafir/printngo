class Order < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :partner, optional: true
  belongs_to :visit
end
