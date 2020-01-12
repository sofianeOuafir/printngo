class Promotion < ApplicationRecord
  belongs_to :partner

  validates_length_of :text, maximum: 100
end
