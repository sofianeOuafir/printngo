class Document < ApplicationRecord
  visitable :ahoy_visit

  has_one_attached :file
  belongs_to :user, optional: true
end
